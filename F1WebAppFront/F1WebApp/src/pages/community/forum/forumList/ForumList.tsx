import React, { useEffect } from "react";
import './ForumList.css';
import { CommunityMainContainer } from "../../../../common/communityMainContainer/CommunityMainContainer";
import { useForum } from "../../../../hooks/useForum";
import { useUser } from "../../../../hooks/useUser";
import { useNavigate } from "react-router-dom";

export const ForumList: React.FC = () => {
    const navigate = useNavigate();
    const { getForumList, forumList } = useForum();
    const { getLoggedUser, userStatusLog, loggedUser } = useUser();

    useEffect(() => {
        getLoggedUser();
        getForumList();
    }, []);

    useEffect(() => {
        if (userStatusLog.error) {
            navigate("/community/login");
        }
        if (loggedUser?.role == 1) {
            navigate("/community/admin/menu");
        }
    }, [userStatusLog, loggedUser, navigate]);

    const handleForumClick = (forumId: number) => {
        navigate(`/community/forum/${forumId}`);
    };

    return (
        <CommunityMainContainer>
            <div className="forum-list-container">
                <h2 className="forum-list-title">Forum Posts Availables</h2>
                <div className="forum-list">
                    {forumList.map((forum, idx) => (
                        <div
                            key={forum.id}
                            className="forum-card"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleForumClick(forum.id)}
                        >
                            <h3>{forum.title}</h3>
                            <p>{forum.description.slice(0, 150)}{forum.description.length > 150 ? "..." : ""}</p>
                            <p style={{ color: "#000000" }}>{forum.username}</p>
                        </div>
                    ))}
                </div>
            </div>
        </CommunityMainContainer>
    );
};