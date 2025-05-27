import { CommunityMainContainer } from "../../../../common/communityMainContainer/CommunityMainContainer";
import { useForum } from "../../../../hooks/useForum";
import { useUser } from "../../../../hooks/useUser";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ForumThread.css";

export const ForumPost: React.FC = () => {
    const { getForumPost, forumPost, createComment, deleteForumComment} = useForum();
    const { getLoggedUser, userStatusLog, loggedUser } = useUser();
    const navigate = useNavigate();

    const { forumId } = useParams<{ forumId: string }>();

    const [newComment, setNewComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 10;

    useEffect(() => {
        getLoggedUser();
        if (forumId) {
            getForumPost(Number(forumId));
        }
    }, []);

    useEffect(() => {
        if (userStatusLog.error) {
            navigate("/community/login");
        }
        if (loggedUser?.role === 1) {
            navigate("/community/admin/menu");
        }
    }, [userStatusLog, loggedUser, navigate]);

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !forumId) return;
        setSubmitting(true);
        console.log("logged user", loggedUser);
        const comment = {
            content: newComment,
            userId: loggedUser?.userId ?? loggedUser?.id,
            threadId: Number(forumId),
        };
        await createComment(comment);
        getForumPost(Number(forumId));
        setNewComment("");
        setSubmitting(false);
    };

    const handleDeleteComment = async (commentId: number) => {
        console.log("Deleting comment with ID:", commentId);
        await deleteForumComment(commentId);
        getForumPost(Number(forumId));
    };


    if (!forumPost) {
        return <div>Loading...</div>;
    }

    const totalPages = Math.ceil(forumPost.comments.length / commentsPerPage);
    const paginatedComments = forumPost.comments.slice(
        (currentPage - 1) * commentsPerPage,
        currentPage * commentsPerPage
    );

    return (
        <CommunityMainContainer>
            <div className="forum-post-container">
                <h1 className="forum-post-title">{forumPost.title}</h1>
                <h4 className="forum-post-description">{forumPost.description}</h4>
                <div className="forum-post-meta">
                    <span>Posted by: {forumPost.username}</span>
                </div>
                <div className="forum-post-comments">
                    <h3>Comments</h3>
                    {paginatedComments.length > 0 ? (
                        <ul>
                            {paginatedComments.map(comment => (
                                <li key={comment.id} className="forum-comment">
                                    <div>
                                        <strong>{comment.username}</strong>
                                        {comment.userId === (loggedUser?.userId ?? loggedUser?.id) && (
                                            <a href="#" className="forum-delete-comment-link"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    handleDeleteComment(comment.id);
                                                }}
                                            >
                                                Delete
                                            </a>
                                        )}
                                    </div>
                                    <div className="forum-post-meta">
                                        ({new Date(comment.createDate).toLocaleString()}):
                                    </div>
                                    <div>{comment.comment}</div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="forum-pagination">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`forum-page-button ${currentPage === index + 1 ? "active" : ""
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}

                <div className="forum-post-comments">
                    <h4>Add a new comment</h4>
                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            rows={3}
                            placeholder="Write your comment..."
                            required
                            disabled={submitting}
                        />
                        <br />
                        <button className="forum-comment-button" type="submit" disabled={submitting || !newComment.trim()}>
                            {submitting ? "Posting..." : "Post Comment"}
                        </button>
                    </form>
                </div>
            </div>
        </CommunityMainContainer>
    );
};
