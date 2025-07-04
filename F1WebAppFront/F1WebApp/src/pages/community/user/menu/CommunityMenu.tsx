import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CommunityMenu.css";
import { useUser } from "../../../../hooks/useUser";
import { useGlobalVariables } from "../../../../settings/globalvariables";
import { CommunityMainContainer } from "../../../../common/communityMainContainer/CommunityMainContainer";

export const CommunityMenu: React.FC = () => {
    const navigate = useNavigate();
    const { userStatusLog, getLoggedUser, loggedUser, getUserPositionByPoints, getUserList } = useUser();
    const [userPosition, setUserPosition] = useState<number | null>(null);

    const {
        showNews,
        showForum,
        showVotings,
        showQuiz
    } = useGlobalVariables();

    useEffect(() => {
        getLoggedUser();
        getUserList();
    }, []);

    useEffect(() => {
        if (userStatusLog.error) {
            navigate("/community/login");
        }
        if (loggedUser?.role == 1) {
            navigate("/community/admin/menu");
        }
        if (loggedUser?.role == 3) {
            navigate("/community/writer/menu");
        }
    }, [userStatusLog, loggedUser, navigate]);

    useEffect(() => {
        const position = getUserPositionByPoints();
        setUserPosition(position);
    }, [loggedUser]);

    if (!loggedUser) return null;

    return (
        <CommunityMainContainer>
            <div className="actual-menu-community">
                <div className="main-card-community">
                    <h1>{loggedUser.username}</h1>
                    <div className="main-card-content-community">
                        <div>
                            <h3>Your points</h3>
                            <h2 className="points-community">{loggedUser.points ?? 0}</h2>
                        </div>
                        <div>
                            <h3>World Position</h3>
                            <h2 className="points-community">🏆{userPosition ? `${userPosition}º` : 'N/A'}🏆</h2>
                        </div>
                    </div>
                </div>
                <div className="sub-cards-community">
                    {showVotings && (
                        <Link to="/community/votings" className="sub-card-community hover:scale-105 transition-transform duration-300 shadow-lg">
                            <h2>🏆 Votings 🏆</h2>
                            <p>🔥 Think you know it all? Prove it in community polls and rack up points to claim the title of the ultimate F1 fan!</p>
                        </Link>
                    )}
                    {showNews && (
                        <Link to="/community/news" className="sub-card-community hover:scale-105 transition-transform duration-300 shadow-lg">
                            <h2>📰 News 📰</h2>
                            <p>Stay updated with community-driven news reports.</p>
                        </Link>
                    )}
                    {showForum && (
                        <Link to="/community/forum" className="sub-card-community hover:scale-105 transition-transform duration-300 shadow-lg">
                            <h2>💬 Forum</h2>
                            <p>Join discussions and share your thoughts with the community.</p>
                        </Link>
                    )}
                    {showQuiz && (
                        <Link to="/community/quiz" className="sub-card-community hover:scale-105 transition-transform duration-300 shadow-lg">
                            <h2>🧠 Quiz Time 🧠</h2>
                            <p>Test your Formula 1 knowledge with challenging quizzes and climb the leaderboard to prove you're the ultimate F1 brain!</p>
                        </Link>
                    )}
                </div>
            </div>
        </CommunityMainContainer>
    );
};
