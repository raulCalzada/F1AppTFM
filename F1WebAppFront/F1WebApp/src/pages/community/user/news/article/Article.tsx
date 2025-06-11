import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Article.css";
import { useNews } from "../../../../../hooks/useNews";
import { CommunityMainContainer } from "../../../../../common/communityMainContainer/CommunityMainContainer";
import { useUser } from "../../../../../hooks/useUser";

export const Article: React.FC = () => {
    const { newId } = useParams();
    const { getNewsArticle, newsArticle, newsStatus, addComment, removeComment } = useNews();
    const { getLoggedUser, loggedUser } = useUser();

    const [newComment, setNewComment] = useState("");
    const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

    useEffect(() => {
        if (newId) {
            getNewsArticle(newId);
        }
        getLoggedUser();
    }, [newId]);

    const handleDeleteComment = async (commentId: number) => {
        if (newsArticle) {
            await removeComment(newsArticle.id, commentId);
            await getNewsArticle(newsArticle.id.toString());
            setMenuOpenId(null);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim() || !loggedUser || !newsArticle) return;

        const now = new Date();
        const formattedDate = now
            .toLocaleString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            })
            .replace(",", "");

        await addComment({
            articleId: newsArticle.id.toString(),
            comment: newComment,
            userId: loggedUser.userId,
            createDate: formattedDate,
        });

        setNewComment("");
        await getNewsArticle(newsArticle.id.toString());
    };

    if (newsStatus.loading || !newsArticle) {
        return <div className="article-loading">Loading...</div>;
    }

    return (
        <CommunityMainContainer>
            <div className="article-container">
                <h2 className="article-title">{newsArticle.title}</h2>
                <p className="article-subtitle">{newsArticle.subtitle}</p>
                <p className="article-meta">By {newsArticle.username} | {new Date(newsArticle.createDate).toLocaleDateString()}</p>

                {newsArticle.imageUrl1.trim() && (
                    <img src={newsArticle.imageUrl1} alt="Main" className="article-image-main" />
                )}

                <div className="article-content">
                    {newsArticle.content}
                </div>

                {newsArticle.imageUrl2?.trim() && (
                <img src={newsArticle.imageUrl2} alt="Secondary" className="article-image-secondary" />
                )}

                <div className="article-comments-section">
                    <h3>Comments</h3>
                    {newsArticle.comments.length > 0 ? (
                        newsArticle.comments.map(comment => (
                            <div key={comment.id} className="article-comment">
                                <div className="comment-header">
                                    <p className="comment-meta">
                                        <strong>{comment.username}</strong> – {new Date(comment.createDate).toLocaleString()}
                                    </p>
                                    {loggedUser && comment.userId === loggedUser.userId && (
                                        <div className="comment-menu">
                                            <button className="menu-button" onClick={() => setMenuOpenId(menuOpenId === comment.id ? null : comment.id)}>⋯</button>
                                            {menuOpenId === comment.id && (
                                                <div className="comment-menu-options">
                                                    <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <p>{comment.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p className="no-comments">No comments yet.</p>
                    )}

                    {loggedUser && (
                        <div className="add-comment-section">
                            <textarea
                                placeholder="Write your comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button className="btn-add" onClick={handleAddComment}>Add Comment</button>
                        </div>
                    )}
                </div>
            </div>
        </CommunityMainContainer>
    );
};
