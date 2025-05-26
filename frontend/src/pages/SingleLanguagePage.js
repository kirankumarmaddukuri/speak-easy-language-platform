import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { SingleLanguageOptions } from "../utils/constants";
import { AuthContext } from "../context/AuthContext";
import { videos } from "../utils/constants";
import "../index.css";

const SingleLanguagePage = () => {
  const { languageName } = useParams();
  const { user } = useContext(AuthContext);

  // Create a map of progress keys to { topic }
  const progressMap = {};

  for (const videoData of videos) {
    const { language, levelsList } = videoData;
    if (language.toLowerCase() === languageName.toLowerCase()) {
      levelsList.forEach((level, levelIndex) => {
        level.videosList.forEach((video, videoIndex) => {
          const key = language.toLowerCase() + "-" + levelIndex + "-" + videoIndex;
          progressMap[key] = { topic: video.title };
        });
      });
    }
  }

  const progressEntries = user && user.progress ? Object.entries(user.progress) : [];

  // Filter progress entries to only those for the current language
  const filteredProgressEntries = progressEntries.filter(([key]) =>
    key.startsWith(languageName.toLowerCase()) && progressMap[key]
  );

  return (
    <main className="section section-center single-lang">
      <div className="section section-center profile-page">
        <h2 className="section-title">Learning Progress for {languageName}</h2>
        {filteredProgressEntries.length === 0 ? (
          <p className="no-progress">No progress data available for this language.</p>
        ) : (
          <table className="progress-table">
            <thead>
              <tr>
                <th>Topic</th>
                <th>Progress / Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredProgressEntries.map(([key, score]) => {
                const info = progressMap[key];
                return (
                  <tr key={key}>
                    <td>{info.topic}</td>
                    <td>{score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <h4>
        <span>Master {languageName}:</span> Learn through Engaging Videos,
        Interactive Quizzes, and Instant Word Lookup!
      </h4>
      <div className="single-lang-options">
        {SingleLanguageOptions.map((langOption) => {
          const { optId, icon, title, text, buttonText, name } = langOption;
          return (
            <article className="single-lang-option" key={optId}>
              <span>{icon}</span>
              <h4>{title}</h4>
              <p>{text}</p>
              {name === "doubt" ? (
                <Link to={`/doubt`} className="btn">
                  {buttonText}
                </Link>
              ) : (
                <Link
                  to={`/languages-page/${languageName}/${name}`}
                  className="btn"
                >
                  {buttonText}
                </Link>
              )}
            </article>
          );
        })}
      </div>
    </main>
  );
};

export default SingleLanguagePage;
