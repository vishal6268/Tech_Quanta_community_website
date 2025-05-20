import { useState, useEffect } from "react";
import axios from "axios";
import { request, gql } from "graphql-request";

const SHEET_URL = "https://script.google.com/macros/s/AKfycbyfbBo7Rlt365zzvLwcFx-cl7ppgip4U5STPXd6rOqHQCa10ZIWqBG5_sLRCyceXXX0vA/exec";
const GITHUB_API = "https://api.github.com/graphql";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const headers = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
};

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

async function fetchGitHubStats(username) {
  try {
    const variables = { username };
    const data = await request(GITHUB_API, GET_USER_STATS, variables, headers);
    const user = data.user;
    if (!user) return null;

    const commits = user.contributionsCollection.totalCommitContributions;
    const pullRequests = user.contributionsCollection.totalPullRequestContributions;
    const issues = user.contributionsCollection.totalIssueContributions;
    const reposContributed = user.repositoriesContributedTo.totalCount;
    const stars = user.starredRepositories.totalCount;
    const followers = user.followers.totalCount;
    const avatar = user.avatarUrl;

    const score =
      commits * 1 +
      pullRequests * 5 +
      issues * 2 +
      reposContributed * 3 +
      stars * 0.5 +
      followers * 0.2;

    return {
      username,
      avatar,
      commits,
      pullRequests,
      issues,
      reposContributed,
      stars,
      followers,
      score: Math.round(score),
    };
  } catch (error) {
    console.error(`Error fetching data for ${username}:`, error);
    return null;
  }
}

async function fetchTechquantaContributors() {
  try {
    const repoData = await request(GITHUB_API, GET_TECHQUANTA_REPOS, {}, headers);
    const repos = repoData.organization.repositories.nodes;

    // Structure: { username: { repoName1: count, repoName2: count, ... } }
    const userRepoCommitsMap = {};

    for (const repo of repos) {
      const contributorsData = await request(
        GITHUB_API,
        GET_REPO_CONTRIBUTORS,
        {
          owner: "techquanta",
          repoName: repo.name,
        },
        headers
      );

      const commits = contributorsData.repository.defaultBranchRef?.target.history.edges || [];

      for (const { node } of commits) {
        const login = node.author?.user?.login;
        if (!login) continue;

        if (!userRepoCommitsMap[login]) {
          userRepoCommitsMap[login] = {};
        }
        userRepoCommitsMap[login][repo.name] = (userRepoCommitsMap[login][repo.name] || 0) + 1;
      }
    }

    return userRepoCommitsMap;
  } catch (error) {
    console.error("Error fetching contributors from techquanta:", error);
    return {};
  }
}

export function useGitHubLeaderboardData() {
  const [allUserStats, setAllUserStats] = useState([]);
  const [displayedUserStats, setDisplayedUserStats] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterActive, setFilterActive] = useState(false);
  const [loadingFilter, setLoadingFilter] = useState(false);

  useEffect(() => {
    async function fetchAll() {
      try {
        const res = await axios.get(SHEET_URL);
        const usernames = res.data?.data?.map(item => item.GitHub_Username).filter(Boolean) || [];

        const statsPromises = usernames.map(username => fetchGitHubStats(username));
        const results = await Promise.all(statsPromises);
        const validStats = results.filter(Boolean);

        setAllUserStats(validStats);
        setDisplayedUserStats(validStats);
      } catch (err) {
        setError("Failed to fetch leaderboard data.");
        console.error(err);
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
    const userRepoCommitsMap = await fetchTechquantaContributors();

    const activeUsers = allUserStats
      .filter(user => userRepoCommitsMap[user.username])
      .map(user => {
        const repoCommits = userRepoCommitsMap[user.username];
        const techquantaCommitsCount = Object.values(repoCommits).reduce((a, b) => a + b, 0);

        return {
          ...user,
          commits: techquantaCommitsCount,  // <-- override total commits with TechQuanta-only commits
          techquantaContributions: repoCommits,
          techquantaCommits: techquantaCommitsCount,
        };
      });

    setDisplayedUserStats(activeUsers);
    setFilterActive(true);
  } catch (err) {
    setError("Failed to fetch active members.");
    console.error(err);
  } finally {
    setLoadingFilter(false);
  }
};


  const showAllMembers = () => {
    setDisplayedUserStats(allUserStats);
    setFilterActive(false);
    setError(null);
  };

  return {
    userStats: displayedUserStats,
    error,
    loading,
    loadingFilter,
    filterActive,
    showActiveMembers,
    showAllMembers,
  };
}
