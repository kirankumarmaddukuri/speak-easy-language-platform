import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { videos } from '../utils/constants';
import '../index.css'; // Assuming common styles are here

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  // Create a map of progress keys to { language, topic }
  const progressMap = {};

  for (const videoData of videos) {
    const { language, levelsList } = videoData;
    levelsList.forEach((level, levelIndex) => {
      level.videosList.forEach((video, videoIndex) => {
        const key = language.toLowerCase() + '-' + levelIndex + '-' + videoIndex;
        progressMap[key] = { language, topic: video.title };
      });
    });
  }

  const progressEntries = user.progress ? Object.entries(user.progress) : [];

  // Filter progress entries to only those with known languages
  const filteredProgressEntries = progressEntries.filter(([key]) =>
    Object.prototype.hasOwnProperty.call(progressMap, key)
  );

  return (
    <div className="section section-center profile-page">
      <h1 className="section-title">{user.username}'s Profile</h1>
      
      <h2 className="section-subtitle">Learning Progress</h2>
      {filteredProgressEntries.length === 0 ? (
        <p className="no-progress">No progress data available.</p>
      ) : (
        <table className="progress-table">
          <thead>
            <tr>
              <th>Language</th>
              <th>Topic</th>
              <th>Progress / Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredProgressEntries.map(([key, score]) => {
              const info = progressMap[key];
              // Extract language prefix from key for display
              const languagePrefix = key.split('-')[0];
              return (
                <tr key={key}>
                  <td>{languagePrefix}</td>
                  <td>{info.topic}</td>
                  <td>{score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProfilePage;
