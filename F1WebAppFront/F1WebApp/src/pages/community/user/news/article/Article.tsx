import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Article.css";
import { useNews } from "../../../../../hooks/useNews";
import { CommunityMainContainer } from "../../../../../common/communityMainContainer/CommunityMainContainer";

export const Article: React.FC = () => {
    const { newId } = useParams();
    const { getNewsArticle, newsArticle, newsStatus } = useNews();

    useEffect(() => {
        if (newId) {
            getNewsArticle(newId);
        }
    }, [newId]);

    if (newsStatus.loading || !newsArticle) {
        return <div className="article-loading">Loading...</div>;
    }

    return (
        <CommunityMainContainer>
            <div className="article-container">
                <h2 className="article-title">{newsArticle.title}</h2>
                <p className="article-subtitle">{newsArticle.subtitle}</p>
                <p className="article-meta">By {newsArticle.username} | {new Date(newsArticle.createDate).toLocaleDateString()}</p>

                {newsArticle.imageUrl1 && (
                    <img src={newsArticle.imageUrl1} alt="Main" className="article-image-main" />
                )}

                <div className="article-content">
                    {newsArticle.content}
                </div>

                {newsArticle.imageUrl2 && (
                    <img src={newsArticle.imageUrl2} alt="Secondary" className="article-image-secondary" />
                )}

                <div className="article-comments-section">
                    <h3>Comments</h3>
                    {newsArticle.comments.length > 0 ? (
                        newsArticle.comments.map(comment => (
                            <div key={comment.id} className="article-comment">
                                <p className="comment-meta">
                                    <strong>{comment.username}</strong> – {new Date(comment.createDate).toLocaleString()}
                                </p>
                                <p>{comment.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p className="no-comments">No comments yet.</p>
                    )}
                </div>
            </div>
        </CommunityMainContainer>
    );
};
