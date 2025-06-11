import React, { useEffect, useState } from "react";
import './ListNewsWriter.css';
import { useNavigate } from "react-router-dom";
import { CommunityWriterMainContainer } from "../../../../common/communityWriterContainer/CommunityWriterMainContainer";
import { useUser } from "../../../../hooks/useUser";
import { useNews } from "../../../../hooks/useNews";
import { Article } from "../../../../types/article";

export const ListNewsWriter: React.FC = () => {
    const { getLoggedUser, userStatusLog, loggedUser } = useUser();
    const {
        getNewsList,
        newsList,
        removeArticle,
        getNewsArticle,
        newsArticle,
        updateArticle,
        removeComment
    } = useNews();

    const navigate = useNavigate();

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState<Partial<Article>>({});

    useEffect(() => {
        getLoggedUser();
        getNewsList();
    }, []);

    useEffect(() => {
        if (userStatusLog.error) navigate("/community/login");
        if (loggedUser?.role === 1) navigate("/community/admin/menu");
        if (loggedUser?.role === 2) navigate("/community/menu");
    }, [userStatusLog, loggedUser, navigate]);

    useEffect(() => {
        if (editingId) {
            getNewsArticle(editingId.toString());
        }
    }, [editingId]);

    useEffect(() => {
        if (newsArticle && editingId) {
            setEditData({
                title: newsArticle.title,
                subtitle: newsArticle.subtitle,
                content: newsArticle.content,
            });
        }
    }, [newsArticle]);

    if (!newsList.length || !loggedUser) return <div>Loading...</div>;

    const userNews = newsList.filter(news => news.authorId === loggedUser.userId);

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this article?")) {
            await removeArticle(id.toString());
            await getNewsList();
        }
    };

    const handleUpdate = (id: number) => {
        setEditingId(id);
    };

    const handleSave = async () => {
        if (editingId && editData) {
            await updateArticle(editingId.toString(), {
                ...newsArticle!,
                ...editData,
            });
            setEditingId(null);
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
        <CommunityWriterMainContainer>
            <div className="news-list-container-writer">
                <h2 className="news-list-title-writer">Your Published Articles</h2>

                <div className="news-grid-writer">
                    {userNews.map((news) => (
                        <div key={news.id} className="news-card-writer">
                            {news.imageUrl1 && <img src={news.imageUrl1} alt={news.title} />}
                            <div className="news-card-content-writer">
                                <h4>{news.title}</h4>
                                <p>{news.subtitle}</p>
                                <p className="snippet">{news.content.slice(0, 60)}...</p>
                            </div>
                            <div className="writer-buttons">
                                <button className="btn-update" onClick={() => handleUpdate(news.id)}>Update</button>
                                <button className="btn-delete" onClick={() => handleDelete(news.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit modal */}
            {editingId && newsArticle && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h2>Edit Article</h2>
                        <text>Title</text>
                        <input
                            type="text"
                            value={editData.title || ''}
                            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                            placeholder="Title"
                        />
                        <text>Subtitle</text>
                        <input
                            type="text"
                            value={editData.subtitle || ''}
                            onChange={(e) => setEditData({ ...editData, subtitle: e.target.value })}
                            placeholder="Subtitle"
                        />
                        <text>Content</text>
                        <textarea
                            rows={10}
                            value={editData.content || ''}
                            onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                            placeholder="Content"
                        />

                        <text>Comments</text>
                        <div className="comment-list">
                            {newsArticle.comments.map((comment) => (
                                <div key={comment.id} className="comment-item">
                                    <span>{comment.username}: {comment.comment}</span>
                                    <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                </div>
                            ))}
                        </div>

                        <div className="modal-actions">
                            <button className="btn-update" onClick={handleSave}>Save</button>
                            <button className="btn-delete" onClick={() => setEditingId(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </CommunityWriterMainContainer>
    );
};
