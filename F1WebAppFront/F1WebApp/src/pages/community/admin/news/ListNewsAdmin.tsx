import React, { useEffect, useState } from "react";
import './ListNewsAdmin.css';
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../hooks/useUser";
import { useNews } from "../../../../hooks/useNews";
import { CommunityAdminMainContainer } from "../../../../common/communityAdminMainContiner/CommunityAdminMainContainer";

export const ListNewsAdmin: React.FC = () => {
    const { getLoggedUser, userStatusLog, loggedUser } = useUser();
    const {
        getNewsList,
        newsList,
        removeArticle,
        getNewsArticle,
        newsArticle,
        removeComment
    } = useNews();

    const [selectedId, setSelectedId] = useState<number | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        getLoggedUser();
        getNewsList();
    }, []);

    useEffect(() => {
        if (userStatusLog.error) navigate("/community/login");
        if (loggedUser?.role === 2) navigate("/community/menu");
    }, [userStatusLog, loggedUser, navigate]);

    useEffect(() => {
        if (selectedId) {
            getNewsArticle(selectedId.toString());
        }
    }, [selectedId]);

    const handleDeleteArticle = async (id: number) => {
        if (confirm("Are you sure you want to delete this article?")) {
            await removeArticle(id.toString());
            await getNewsList();
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        if (newsArticle) {
            await removeComment(newsArticle.id, commentId);
            await getNewsArticle(newsArticle.id.toString());
        }
    };

    return (
        <CommunityAdminMainContainer>
            <div className="news-list-container-admin">
                <h2 className="news-list-title-admin">Published Articles</h2>

                <div className="news-grid-admin">
                    {newsList.map((news) => (
                        <div key={news.id} className="news-card-admin">
                            {news.imageUrl1 && <img src={news.imageUrl1} alt={news.title} />}
                            <div className="news-card-content-admin">
                                <h4>{news.title}</h4>
                                <p>{news.subtitle}</p>
                                <p className="snippet-admin">{news.content.slice(0, 60)}...</p>
                            </div>
                            <div className="admin-buttons">
                                <button className="btn-update" onClick={() => setSelectedId(news.id)}>View Comments</button>
                                <button className="btn-delete" onClick={() => handleDeleteArticle(news.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedId && newsArticle && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h2>Comments</h2>
                        <div className="comment-list">
                            {Array.isArray(newsArticle.comments) && newsArticle.comments.length > 0 ? (
                                newsArticle.comments.map((comment) => (
                                    <div key={comment.id} className="comment-item">
                                        <span>{comment.username}: {comment.comment}</span>
                                        <button className="btn-delete" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                    </div>
                                ))
                            ) : (
                                <p>No comments</p>
                            )}
                        </div>
                        <div className="modal-actions">
                            <button className="btn-delete" onClick={() => setSelectedId(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </CommunityAdminMainContainer>
    );
};
