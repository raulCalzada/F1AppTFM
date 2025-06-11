import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MenuWriter.css";
import { useUser } from "../../../../hooks/useUser";
import { useGlobalVariables } from "../../../../settings/globalvariables";
import { CommunityWriterMainContainer } from "../../../../common/communityWriterContainer/CommunityWriterMainContainer";

export const MenuWriter: React.FC = () => {
    const navigate = useNavigate();
    const { userStatusLog, getLoggedUser, loggedUser } = useUser();

    const {
        showNews,
        showForum,
        showVotings
    } = useGlobalVariables();

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
        if (loggedUser?.role == 2) {
            navigate("/community/menu");
        }
    }, [userStatusLog, loggedUser, navigate]);

    if (!loggedUser) return null;

    return (
        <CommunityWriterMainContainer>
            <div className="actual-menu-writter">
                <div className="main-card-writter">
                    <h1 className="main-title-page-writter main-card-title-writter">📝 Writer Menu</h1>
                    <div className="main-card-content-writter">
                        <p className="points-writter">Create and manage your news here</p>
                    </div>
                </div>
                <div className="sub-cards-writter">
                    <Link to="/community/writer/news/create" className="sub-card-writter">
                        <h2 className="sub-card-title-writter">🆕 Create News</h2>
                        <p className="sub-card-description-writter">Write and publish a new article</p>
                    </Link>
                    <Link to="/community/writer/news" className="sub-card-writter">
                        <h2 className="sub-card-title-writter">📚 View News</h2>
                        <p className="sub-card-description-writter">See, edit or delete your published news</p>
                    </Link>
                </div>
            </div>
        </CommunityWriterMainContainer>
    );
};
