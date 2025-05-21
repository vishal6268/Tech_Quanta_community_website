import { useState, useEffect } from "react";
import axios from "axios";
import { request, gql } from "graphql-request";
import { setWithExpiry, getWithExpiry } from "../utils/storageWithExpiry";

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbyfbBo7Rlt365zzvLwcFx-cl7ppgip4U5STPXd6rOqHQCa10ZIWqBG5_sLRCyceXXX0vA/exec";

const GITHUB_API = "https://api.github.com/graphql";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const headers = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
};

const SESSION_KEY = "github_leaderboard_data";
const SESSION_TTL = 10 * 60 * 1000; // 10 minutes

const GET_USER_STATS = gql`
  query ($username: String!) {
    user(login: $username) {
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalRepositoriesWithContributedCommits
      }
      repositoriesContributedTo(contributionTypes: [COMMIT, PULL_REQUEST, ISSUE]) {
        totalCount
      }
      followers {
        totalCount
      }
      starredRepositories {
        totalCount
      }
      avatarUrl
    }
  }
`;

const GET_TECHQUANTA_REPOS = gql`
  query {
    organization(login: "techquanta") {
      repositories(first: 30) {
        nodes {
          name
        }
      }
    }
  }
`;

const GET_REPO_CONTRIBUTORS = gql`
  query ($owner: String!, $repoName: String!) {
    repository(owner: $owner, name: $repoName) {
      defaultBranchRef {
        target {
          ... on Commit {
            history(first: 100) {
              edges {
                node {
                  author {
                    user {
                      login
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchGitHubStats(username) {
  try {
    const data = await request(GITHUB_API, GET_USER_STATS, { username }, headers);
    const user = data.user;
    if (!user) return null;

    const {
      contributionsCollection,
      repositoriesContributedTo,
      followers,
      starredRepositories,
      avatarUrl,
    } = user;

    const score =
      contributionsCollection.totalCommitContributions * 1 +
      contributionsCollection.totalPullRequestContributions * 5 +
      contributionsCollection.totalIssueContributions * 2 +
      repositoriesContributedTo.totalCount * 3 +
      starredRepositories.totalCount * 0.5 +
      followers.totalCount * 0.2;

    return {
      username,
      avatar: avatarUrl,
      commits: contributionsCollection.totalCommitContributions,
      pullRequests: contributionsCollection.totalPullRequestContributions,
      issues: contributionsCollection.totalIssueContributions,
      reposContributed: repositoriesContributedTo.totalCount,
      stars: starredRepositories.totalCount,
      followers: followers.totalCount,
      score: Math.round(score),
    };
  } catch (err) {
    console.error(`Error fetching data for ${username}:`, err);
    return null;
  }
}

async function fetchTechquantaContributors() {
  try {
    const repoData = await request(GITHUB_API, GET_TECHQUANTA_REPOS, {}, headers);
    const repos = repoData.organization.repositories.nodes;
    const userRepoCommitsMap = {};

    for (const repo of repos) {
      const contributorsData = await request(
        GITHUB_API,
        GET_REPO_CONTRIBUTORS,
        { owner: "techquanta", repoName: repo.name },
        headers
      );

      const commits = contributorsData.repository?.defaultBranchRef?.target?.history?.edges || [];

      for (const { node } of commits) {
        const login = node.author?.user?.login;
        if (!login) continue;
        if (!userRepoCommitsMap[login]) userRepoCommitsMap[login] = {};
        userRepoCommitsMap[login][repo.name] = (userRepoCommitsMap[login][repo.name] || 0) + 1;
      }
    }

    return userRepoCommitsMap;
  } catch (err) {
    console.error("Error fetching Techquanta contributors:", err);
    return {};
  }
}

export function useGitHubLeaderboardData() {
  const [allUserStats, setAllUserStats] = useState([]);
  const [displayedUserStats, setDisplayedUserStats] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [allDataNull, setAllDataNull] = useState(false);

  useEffect(() => {
    async function fetchAll() {
      const cached = getWithExpiry(SESSION_KEY);
      if (cached) {
        setAllUserStats(cached);
        setDisplayedUserStats(cached);
        setLoading(false);
        setAllDataNull(cached.length === 0);
        return;
      }

      try {
        const res = await axios.get(SHEET_URL);
        const usernames = res.data?.data?.map((u) => u.GitHub_Username).filter(Boolean) || [];
        const userRepoCommitsMap = await fetchTechquantaContributors();

        const statsArray = [];

        for (const username of usernames) {
          const stats = await fetchGitHubStats(username);
          if (!stats) continue;

          const repoCommits = userRepoCommitsMap[username] || {};
          const techquantaCommits = Object.values(repoCommits).reduce((a, b) => a + b, 0);
          stats.score += techquantaCommits * 4;
          stats.techquantaCommits = techquantaCommits;
          stats.techquantaContributions = repoCommits;

          statsArray.push(stats);
          await sleep(1500); // GitHub API rate limiting
        }

        setWithExpiry(SESSION_KEY, statsArray, SESSION_TTL);
        setAllUserStats(statsArray);
        setDisplayedUserStats(statsArray);
        setAllDataNull(statsArray.length === 0);
      } catch (err) {
        console.error("Error loading leaderboard data:", err);
        setError("Failed to fetch leaderboard data.");
        setAllDataNull(true);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  const showActiveMembers = async () => {
    setLoadingFilter(true);
    setError(null);
    try {
      const repoMap = await fetchTechquantaContributors();
      const active = allUserStats
        .filter((u) => repoMap[u.username])
        .map((u) => {
          const repos = repoMap[u.username];
          const commits = Object.values(repos).reduce((a, b) => a + b, 0);
          return {
            ...u,
            commits,
            techquantaContributions: repos,
            techquantaCommits: commits,
          };
        });

      setDisplayedUserStats(active);
      setFilterActive(true);
      setAllDataNull(active.length === 0);
    } catch (err) {
      console.error("Error filtering active members:", err);
      setError("Failed to fetch active members.");
      setAllDataNull(true);
    } finally {
      setLoadingFilter(false);
    }
  };

  const showAllMembers = () => {
    setDisplayedUserStats(allUserStats);
    setFilterActive(false);
    setError(null);
    setAllDataNull(allUserStats.length === 0);
  };

  return {
    userStats: displayedUserStats || [],
    error: error || null,
    loading: loading || false,
    loadingFilter: loadingFilter || false,
    filterActive: filterActive || false,
    allDataNull,
    showActiveMembers,
    showAllMembers,
  };
}
