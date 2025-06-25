import React from "react";
import { useGlobalVariables } from "../../../../settings/globalvariables";
import "./SettingsAdmin.css";
import { CommunityAdminMainContainer } from "../../../../common/communityAdminMainContiner/CommunityAdminMainContainer";

export const SettingsAdmin: React.FC = () => {
    const {
        showNews, setShowNews,
        showForum, setShowForum,
        showVotings, setShowVotings,
        showQuiz, setShowQuiz
    } = useGlobalVariables();

    return (
        <CommunityAdminMainContainer>
            <div className="settings-admin">
                <h2>Admin Settings</h2>
                <div className="toggle-container">
                    <span>Show News</span>
                    <button
                        className={`toggle-btn ${showNews ? "on" : "off"}`}
                        onClick={() => setShowNews(!showNews)}
                    >
                        {showNews ? "ON" : "OFF"}
                    </button>
                </div>
                <div className="toggle-container">
                    <span>Show Forum</span>
                    <button
                        className={`toggle-btn ${showForum ? "on" : "off"}`}
                        onClick={() => setShowForum(!showForum)}
                    >
                        {showForum ? "ON" : "OFF"}
                    </button>
                </div>
                <div className="toggle-container">
                    <span>Show Votings</span>
                    <button
                        className={`toggle-btn ${showVotings ? "on" : "off"}`}
                        onClick={() => setShowVotings(!showVotings)}
                    >
                        {showVotings ? "ON" : "OFF"}
                    </button>
                </div>
                <div className="toggle-container">
                    <span>Show Quizzes</span>
                    <button
                        className={`toggle-btn ${showQuiz ? "on" : "off"}`}
                        onClick={() => setShowQuiz(!showQuiz)}
                    >
                        {showVotings ? "ON" : "OFF"}
                    </button>
                </div>
            </div>
        </CommunityAdminMainContainer>
    );
};
