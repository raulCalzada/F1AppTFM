import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CommunityMenu.css";
import { CommunityMainContainer } from "../../../common/communityMainContainer/CommunityMainContainer";
import { useUser } from "../../../hooks/useUser";

export const CommunityMenu: React.FC = () => {
    const navigate = useNavigate();
    const { userStatusLog, getLoggedUser, loggedUser } = useUser();

    useEffect(() => {
        getLoggedUser();
    }, []);

    useEffect(() => {        
        if (userStatusLog.error) {
            navigate("/community/login");
        }
        if (loggedUser?.role == 1) {            
            navigate("/community/admin/menu");
        }
    }, [userStatusLog, loggedUser, navigate]);

    if (!loggedUser) return null; // O un loader

    return (
        <CommunityMainContainer>
            <div className="actual-menu-community">
                <div className="main-card-community">
                    <p className="main-card-title-community">{loggedUser.username}</p>
                    <div className="main-card-content-community">
                        <div>
                            <h3>Your points</h3>
                            <h2 className="points-community">{loggedUser.points ?? 0}</h2>
                        </div>
                        <div>
                            <h3>World Position</h3>
                            <h2 className="points-community">🏆10º🏆</h2>
                        </div>                       
                    </div>
                </div>
                <div className="sub-cards-community">
                    <Link to="/votings" className="sub-card-community hover:scale-105 transition-transform duration-300 shadow-lg">
                        <h2>🏆 Votings 🏆</h2>
                        <p> 🔥 Think you know it all? Prove it in community polls and rack up points to claim the title of the ultimate F1 fan! </p>
                    </Link>
                    <Link to="/news" className="sub-card-community hover:scale-105 transition-transform duration-300 shadow-lg">
                        <h2>📰 News 📰</h2>
                        <p>Stay updated with community-driven news reports.</p>
                    </Link>
                    <Link to="/community/forum" className="sub-card-community hover:scale-105 transition-transform duration-300 shadow-lg">
                        <h2>💬 Forum</h2>
                        <p>Join discussions and share your thoughts with the community.</p>
                    </Link>
                </div>
            </div>
        </CommunityMainContainer>
    );
};
