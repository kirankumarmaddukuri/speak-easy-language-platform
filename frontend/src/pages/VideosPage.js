import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { videos } from "../utils/constants";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { updateUserProgress } from "../api";
import { FaArrowLeft, FaPlay, FaCheck, FaLanguage, FaGraduationCap } from "react-icons/fa";

const VideosPage = () => {
  const { languageName } = useParams();
  const { user } = useContext(AuthContext);
  const { addToast } = useToast();
  const history = useHistory();

  const { language, levelsList } = videos.find(
    (video) => video.language.toLowerCase() === languageName.toLowerCase()
  );

  // Initialize completedStates as an object keyed by language-level-video index
  const [completedStates, setCompletedStates] = useState({});

  // Helper to generate unique key for each video completion state including language
  const getVideoKey = (language, levelIndex, videoIndex) =>
    language.toLowerCase() + "-" + levelIndex + "-" + videoIndex;

  // Load user progress on mount and initialize completedStates
  useEffect(() => {
    if (user && user.progress) {
      const newCompletedStates = {};
      levelsList.forEach((level, levelIndex) => {
        level.videosList.forEach((video, videoIndex) => {
          const key = getVideoKey(language, levelIndex, videoIndex);
          newCompletedStates[key] = !!user.progress[key];
        });
      });
      setCompletedStates(newCompletedStates);
    }
  }, [user, levelsList, language]);

  const handleChange = async (levelIndex, videoIndex) => {
    const key = getVideoKey(language, levelIndex, videoIndex);
    const newValue = !completedStates[key];
    const videoTitle = levelsList[levelIndex].videosList[videoIndex].title;

    // Update local state optimistically
    setCompletedStates((prevStates) => ({
      ...prevStates,
      [key]: newValue,
    }));

    // Prepare progress update object for backend (old system)
    const progressUpdate = {
      [key]: newValue ? 1 : 0,
    };

    try {
      await updateUserProgress(progressUpdate);
      addToast(
        newValue 
          ? `Marked "${videoTitle}" as completed!` 
          : `Marked "${videoTitle}" as incomplete.`,
        newValue ? "success" : "info"
      );
    } catch (error) {
      console.error("Failed to update progress", error);
      // Revert state on failure
      setCompletedStates((prevStates) => ({
        ...prevStates,
        [key]: !newValue,
      }));
      addToast("Failed to update video progress. Please try again.", "error");
    }
  };

  return (
    <main className="videos section section-center">
      <button className="btn" onClick={() => history.goBack()} style={{ marginBottom: "1rem" }}>
        <FaArrowLeft className="icon" /> Go Back
      </button>
      <div className="videos-info">
        <p>
          <FaLanguage className="icon" /> {"Unlock your "}
          <span>{language.toUpperCase()}</span>
          {" potential with our curated videos. From beginner basics to expert insights, each video is a step towards fluency. Start your journey to " + language + " mastery today!"}
        </p>
      </div>

      {levelsList.map((level, levelIndex) => {
        return (
          <div className="videos-level" key={levelIndex}>
            <h4><FaGraduationCap className="icon" /> {level.level}</h4>

            <div className="videos-list">
              {level.videosList.map((video, videoIndex) => {
                const key = getVideoKey(language, levelIndex, videoIndex);
                return (
                  <div
                    key={videoIndex}
                    className={completedStates[key] ? "completed" : ""}
                  >
                    <h5>
                      <input
                        type="checkbox"
                        name={"isCompleted-" + key}
                        checked={completedStates[key] || false}
                        onChange={() => handleChange(levelIndex, videoIndex)}
                      />{" "}
                      {completedStates[key] ? <FaCheck className="icon completed" /> : null}
                      {video.title}
                    </h5>
                    <a href={video.src} className="btn" target="_blank" rel="noopener noreferrer">
                      <FaPlay className="icon" /> Watch video
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default VideosPage;
