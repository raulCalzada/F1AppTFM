import React, { useEffect, useState } from "react";
import './ForumList.css';
import { CommunityMainContainer } from "../../../../common/communityMainContainer/CommunityMainContainer";
import { useForum } from "../../../../hooks/useForum";
import { useUser } from "../../../../hooks/useUser";
import { useNavigate } from "react-router-dom";

const FORUMS_PER_PAGE = 10;

export const ForumList: React.FC = () => {
    const navigate = useNavigate();
    const { getForumList, forumList } = useForum();
    const { getLoggedUser, userStatusLog, loggedUser } = useUser();
    const [currentPage, setCurrentPage] = useState(1);

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

    const totalPages = Math.ceil(forumList.length / FORUMS_PER_PAGE);
    const startIdx = (currentPage - 1) * FORUMS_PER_PAGE;
    const currentForums = forumList.slice(startIdx, startIdx + FORUMS_PER_PAGE);

    const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
    const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

    return (
        <CommunityMainContainer>
            <div className="forum-list-container">
                <h2 className="forum-list-title">Forum Posts Availables</h2>
                <div className="forum-list">
                    {currentForums.map((forum) => (
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
                <div className="forum-pagination">
                    <button onClick={handlePrev} disabled={currentPage === 1}>Anterior</button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button onClick={handleNext} disabled={currentPage === totalPages}>Siguiente</button>
                </div>
            </div>
        </CommunityMainContainer>
    );
};