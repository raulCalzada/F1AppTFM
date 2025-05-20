import React from "react";
import { Link } from "react-router-dom";
import "./CommunityMenu.css";
import { CommunityMainContainer } from "../../../common/communityMainContainer/CommunityMainContainer";

export const CommunityMenu: React.FC = () => {
    return (
        <CommunityMainContainer>
            <div className="actual-menu-community">
                <div className="main-card-community">
                    <p className="main-card-title-community">raluu_09</p>
                    <div className="main-card-content-community">
                        <div>
                            <h3>Your points</h3>
                            <h2 className="points-community">1000</h2>
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
                    <Link to="/forum" className="sub-card-community hover:scale-105 transition-transform duration-300 shadow-lg">
                        <h2>💬 Forum</h2>
                        <p>Join discussions and share your thoughts with the community.</p>
                    </Link>
                </div>
            </div>
        </CommunityMainContainer>
    );
};
