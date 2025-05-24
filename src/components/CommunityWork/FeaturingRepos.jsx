import React, { useEffect, useState } from 'react';

const RepoCard = ({ name, description, language, stars, visibility }) => {
  return (
    <div className="bg-white text-black shadow rounded-md p-4 w-full sm:w-[300px]">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
        <span>📁</span>
        <span className="font-semibold">{name}</span>
        <span className="bg-gray-200 px-2 py-0.5 rounded text-xs">{visibility}</span>
      </div>
      <p className="text-sm mt-1">{description}</p>
      <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
        <span className="flex items-center gap-1">🔵 {language}</span>
        <span className="flex items-center gap-1">⭐ {stars}</span>
      </div>
    </div>
  );
};

const FeaturingRepos = () => {
  const staticRepos = [
    { id: 1, name: 'hls-parser', description: 'HLS stream parser', language: 'Go', stars: 10, visibility: 'Public' },
    { id: 2, name: 'auth-system', description: 'Authentication service', language: 'JavaScript', stars: 23, visibility: 'Public' },
    { id: 3, name: 'portfolio-site', description: 'My personal portfolio', language: 'HTML', stars: 5, visibility: 'Public' },
    { id: 4, name: 'todo-api', description: 'RESTful ToDo API', language: 'Node.js', stars: 14, visibility: 'Public' },
    { id: 5, name: 'chat-app', description: 'Realtime chat application', language: 'React', stars: 18, visibility: 'Public' },
    { id: 6, name: 'weather-app', description: 'Weather forecast app', language: 'Python', stars: 30, visibility: 'Public' },
  ];

  const [repos, setRepos] = useState(staticRepos);

  useEffect(() => {
    setTimeout(() => {
      const updatedRepos = [
        { id: 1, name: 'new-hls', description: 'Updated HLS parser', language: 'Go', stars: 15, visibility: 'Public' },
        { id: 2, name: 'jwt-auth', description: 'Secure JWT auth', language: 'TypeScript', stars: 35, visibility: 'Public' },
        { id: 3, name: 'dev-portfolio', description: 'Modern developer portfolio', language: 'Next.js', stars: 12, visibility: 'Public' },
        { id: 4, name: 'notes-api', description: 'Note-taking backend', language: 'Express', stars: 20, visibility: 'Public' },
        { id: 5, name: 'game-center', description: 'Web-based games hub', language: 'JavaScript', stars: 25, visibility: 'Public' },
        { id: 6, name: 'ai-summarizer', description: 'Summarize content using AI', language: 'Python', stars: 42, visibility: 'Public' },
      ];
      setRepos(updatedRepos);
    }, 3000);
  }, []);

  return (
    <div className="bg-transparent text-white px-6 py-10 flex justify-center">
      <div className="w-full max-w-6xl">
        <h2 className="text-4xl font-bold text-green-400 mb-8">Featuring Repo's</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <RepoCard key={repo.id} {...repo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturingRepos;
