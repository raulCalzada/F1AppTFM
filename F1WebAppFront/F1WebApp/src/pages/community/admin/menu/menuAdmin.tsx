import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MenuAdmin.css";
import { CommunityAdminMainContainer } from "../../../../common/communityAdminMainContiner/CommunityAdminMainContainer";
import { useUser } from "../../../../hooks/useUser";

export const MenuAdmin: React.FC = () => {
    const navigate = useNavigate();
    const { userStatusLog, getLoggedUser, loggedUser } = useUser();

    useEffect(() => {
        getLoggedUser();
    }, []);

    useEffect(() => {
        if (userStatusLog.error) {
            navigate("/community/login");
        }
        if (loggedUser?.role == 2) {
            navigate("/community/menu");
        }
    }, [userStatusLog, loggedUser, navigate]);

    if (!loggedUser) return null;

    return (
        <CommunityAdminMainContainer>
            <div className="actual-menu-admin">
                <div className="sub-cards-admin">
                    <Link to="/community/admin/users" className="sub-card-admin hover:scale-105 transition-transform duration-300 shadow-lg">
                        <h2>👤Users👤</h2>
                        <p>Update/Delete users or give 🏆Points🏆</p>
                    </Link>
                    <Link to="/community/admin/news" className="sub-card-admin hover:scale-105 transition-transform duration-300 shadow-lg">
                        <h2>📰 News 📰</h2>
                        <p>Delete news</p>
                    </Link>
                    <Link to="/community/admin/forum" className="sub-card-admin hover:scale-105 transition-transform duration-300 shadow-lg">
                        <h2>💬 Forum</h2>
                        <p>Delete Forum Threads</p>
                    </Link>
                    <Link to="/community/votings" className="sub-card-admin hover:scale-105 transition-transform duration-300 shadow-lg">
                        <h2>Votings</h2>
                        <p>Create, delete, give puntuations from votings</p>
                    </Link>
                    <Link to="/community/admin/settings" className="sub-card-admin hover:scale-105 transition-transform duration-300 shadow-lg">
                        <h2 style={{ color: "orange" }}>Settings</h2>
                        <p>Put or Quit functionalities from production</p>
                    </Link>
                </div>
            </div>
        </CommunityAdminMainContainer>
    );
};
