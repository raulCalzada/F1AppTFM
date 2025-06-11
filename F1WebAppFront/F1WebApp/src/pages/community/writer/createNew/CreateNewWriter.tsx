import React, { useEffect, useState } from "react";
import './CreateNewWriter.css';
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../hooks/useUser";
import { useNews } from "../../../../hooks/useNews";
import { CommunityWriterMainContainer } from "../../../../common/communityWriterContainer/CommunityWriterMainContainer";
import { Article } from "../../../../types/article";

export const CreateNewWriter: React.FC = () => {
     console.log("Mounted CreateNewWriter");
    const { loggedUser, getLoggedUser } = useUser();
    const { createArticle } = useNews();
    const navigate = useNavigate();

    useEffect(() => {
        getLoggedUser();
    }, []);

    const [formData, setFormData] = useState<Partial<Article>>({
        title: "",
        subtitle: "",
        content: "",
        imageUrl1: "",
        imageUrl2: "",
    });

    const [fileName1, setFileName1] = useState<string | null>(null);
    const [fileName2, setFileName2] = useState<string | null>(null);
    const [dragActive1, setDragActive1] = useState(false);
    const [dragActive2, setDragActive2] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileDrop = (
        e: React.DragEvent<HTMLDivElement>,
        field: "imageUrl1" | "imageUrl2",
        setFileName: React.Dispatch<React.SetStateAction<string | null>>,
        setDragActive: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        e.preventDefault();
        setDragActive(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            const newFileName = `newsImages/${file.name}`;

            const reader = new FileReader();
            reader.onload = () => {
                setFileName(newFileName);
                setFormData(prev => ({ ...prev, [field]: newFileName }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        console.log("button push:", loggedUser);
        e.preventDefault();
        if (!loggedUser) return;

        const newArticle: Article = {
            id: 0,
            title: formData.title || "",
            subtitle: formData.subtitle || "",
            content: formData.content || "",
            imageUrl1: formData.imageUrl1 || "",
            imageUrl2: formData.imageUrl2 || "",
            authorId: loggedUser.userId,
            username: loggedUser.username,
            createDate: new Date().toISOString(),
            comments: []
        };
        await createArticle(newArticle);
        navigate("/community/writer/news");
    };

    return (
        <CommunityWriterMainContainer>
            <div className="create-news-container">
                <h2>Create New Article</h2>
                <form onSubmit={handleSubmit} className="create-news-form">

                    <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                    <input name="subtitle" placeholder="Subtitle" value={formData.subtitle} onChange={handleChange} required />
                    <textarea name="content" placeholder="Content" rows={10} value={formData.content} onChange={handleChange} required />

                    <label>Main Image</label>
                    <input
                        name="imageUrl1"
                        placeholder="Paste image URL or use drag-and-drop below"
                        value={formData.imageUrl1}
                        onChange={handleChange}
                    />
                    <div
                        className={`dropzone ${dragActive1 ? 'active' : ''}`}
                        onDragOver={(e) => { e.preventDefault(); setDragActive1(true); }}
                        onDragLeave={() => setDragActive1(false)}
                        onDrop={(e) => handleFileDrop(e, "imageUrl1", setFileName1, setDragActive1)}
                    >
                        {fileName1 ? <p>Uploaded: {fileName1}</p> : <p>Drag & Drop image here</p>}
                    </div>

                    <label>Secondary Image (optional)</label>
                    <input
                        name="imageUrl2"
                        placeholder="Paste image URL or use drag-and-drop below"
                        value={formData.imageUrl2}
                        onChange={handleChange}
                    />
                    <div
                        className={`dropzone ${dragActive2 ? 'active' : ''}`}
                        onDragOver={(e) => { e.preventDefault(); setDragActive2(true); }}
                        onDragLeave={() => setDragActive2(false)}
                        onDrop={(e) => handleFileDrop(e, "imageUrl2", setFileName2, setDragActive2)}
                    >
                        {fileName2 ? <p>Uploaded: {fileName2}</p> : <p>Drag & Drop image here</p>}
                    </div>

                    <button type="submit" onClick={() => console.log("Click")}>Publish Article</button>
                </form>
            </div>
        </CommunityWriterMainContainer>
    );
};
