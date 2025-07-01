import React, { useEffect, useState } from "react";
import { useForum } from "../../../../hooks/useForum";
import { useUser } from "../../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { CommunityAdminMainContainer } from "../../../../common/communityAdminMainContiner/CommunityAdminMainContainer";
import "./AdminForum.css";

const FORUMS_PER_PAGE = 10;

const Modal: React.FC<{ open: boolean; onClose: () => void; children: React.ReactNode }> = ({ open, onClose, children }) => {
    if (!open) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

export const AdminForum: React.FC = () => {
    const navigate = useNavigate();
    const { getForumList, forumList, deleteForumPost, forumPost, getForumPost, deleteForumComment } = useForum();
    const { getLoggedUser, userStatusLog, loggedUser } = useUser();
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        getLoggedUser();
        getForumList();
    }, []);

    useEffect(() => {
        if (userStatusLog.error) {
            navigate("/community/login");
        }
        if (loggedUser?.role == 2) {
            navigate("/community/menu");
        }
    }, [userStatusLog, loggedUser, navigate]);

    const handleForumClick = (forumId: number) => {
        getForumPost(forumId);
        setModalOpen(true);
    };

    const handleDelete = async (forumId: number) => {
        if (window.confirm("¿Seguro que quieres eliminar este post?")) {
            await deleteForumPost(forumId);
            getForumList();
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        if (window.confirm("¿Seguro que quieres eliminar este comentario?")) {
            console.log("Deleting comment with ID:", commentId);
            await deleteForumComment(commentId);
            if (forumPost) {
                getForumPost(forumPost.id);
            }
        }
    }

    const totalPages = Math.ceil(forumList.length / FORUMS_PER_PAGE);
    const startIdx = (currentPage - 1) * FORUMS_PER_PAGE;
    const currentForums = forumList.slice(startIdx, startIdx + FORUMS_PER_PAGE);

    const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
    const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

    return (
        <CommunityAdminMainContainer>
            <div className="forum-list-container-admin">
                <h2 className="forum-list-title-admin">Forum Posts Availables</h2>
                <div className="forum-list-admin">
                    {currentForums.map((forum) => (
                        <div
                            key={forum.id}
                            className="forum-card-admin"
                        >
                            <div>
                                <h3>{forum.title}</h3>
                                <p>{forum.description.slice(0, 150)}{forum.description.length > 150 ? "..." : ""}</p>
                                <p style={{ color: "#000000" }}>{forum.username}</p>
                            </div>
                            <button
                                className="view-button-admin"
                                onClick={() => handleForumClick(forum.id)}
                            >
                                Comments
                            </button>
                            <button
                                className="delete-button-admin"
                                onClick={() => handleDelete(forum.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
                <div className="forum-pagination-admin">
                    <button onClick={handlePrev} disabled={currentPage === 1}>Anterior</button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button onClick={handleNext} disabled={currentPage === totalPages}>Siguiente</button>
                </div>
            </div>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                {forumPost && (
                    <div className="forum-modal-admin">
                        <h2 className="forum-modal-title-admin">{forumPost.title}</h2>
                        <p className="forum-modal-description-admin">{forumPost.description}</p>
                        <h4 className="forum-modal-comments-title-admin">Comments:</h4>
                        <ul className="forum-modal-comments-list-admin">
                            {forumPost.comments && forumPost.comments.length > 0 ? (
                                forumPost.comments.map((comment: any) => (
                                    <li key={comment.id} className="forum-modal-comment-item-admin">
                                        <strong className="forum-modal-comment-username-admin">{comment.username}:</strong>
                                        <span className="forum-modal-comment-text-admin">{comment.comment}</span>
                                        <button
                                            className="forum-modal-delete-comment-button-admin"
                                            onClick={() => handleDeleteComment(comment.id)}
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li className="forum-modal-no-comments-admin">No Comments</li>
                            )}
                        </ul>
                    </div>
                )}
            </Modal>
        </CommunityAdminMainContainer>
    );
};