import { useNavigate } from "react-router-dom";
import { useForum } from "../../../../../hooks/useForum";
import { useUser } from "../../../../../hooks/useUser";
import { useEffect, useState } from "react";
import "./CreateForum.css";
import { CommunityMainContainer } from "../../../../../common/communityMainContainer/CommunityMainContainer";

export const CreateForum: React.FC = () => {
    const navigate = useNavigate();
    const { createPost } = useForum();
    const { getLoggedUser, loggedUser } = useUser();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        getLoggedUser();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content || !loggedUser) return;
        await createPost({ title, content, userId: loggedUser.userId });
        navigate("/community/forum");
    };

    return (
        <CommunityMainContainer>
            <div className="forum-container">
                <h2 className="create-forum-title">Create New Forum</h2>
                <button
                    className="back-btn"
                    type="button"
                    onClick={() => navigate(-1)}
                    style={{ marginBottom: "16px" }}
                >
                    Go back
                </button>
                <form className="create-forum-form" onSubmit={handleCreate}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        required
                    />
                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>
            </div>
        </CommunityMainContainer>
    );
}