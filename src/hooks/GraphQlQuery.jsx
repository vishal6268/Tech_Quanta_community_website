// src/hooks/useGitHubLeaderboardData.js
import { useState, useEffect } from "react";
import axios from "axios";
import { request, gql } from "graphql-request";

const SHEET_URL = "https://script.google.com/macros/s/AKfycbyfbBo7Rlt365zzvLwcFx-cl7ppgip4U5STPXd6rOqHQCa10ZIWqBG5_sLRCyceXXX0vA/exec";

const GITHUB_API = "https://api.github.com/graphql";
const GITHUB_TOKEN = "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";

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

async function fetchGitHubStats(username) {
  try {
    const variables = { username };
    const data = await request(GITHUB_API, GET_USER_STATS, variables, headers);
    const user = data.user;

    if (!user) return null; // user not found

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

export function useGitHubLeaderboardData() {
  const [userStats, setUserStats] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        // Fetch usernames from your AppScript API
        const res = await axios.get(SHEET_URL);
        const data = res.data?.data || [];
        const usernames = data.map((item) => item.GitHub_Username).filter(Boolean);

        // Fetch stats for each username
        const statsPromises = usernames.map((username) => fetchGitHubStats(username));
        const results = await Promise.all(statsPromises);

        setUserStats(results.filter(Boolean));
      } catch (err) {
        setError("Failed to fetch leaderboard data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  return { userStats, error, loading };
}
