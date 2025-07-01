import { User } from './../types/user.d';
import { useCallback, useState } from "react";
import { useStatus } from "./useStatus";
import { ForumPost } from "../types/forum";
import { createForumComment, createForumThread, deleteForumThread, deleteForumThreadComment, obtainForumThread, obtainForumThreads } from "../api/forum";
import { obtainUser } from '../api/user';

export const useForum = () => {
    const [forumList, setForumList] = useState<ForumPost[]>([]); 
    const { status: forumStatus, onSuccess, onError, onLoading } = useStatus(); 
    const [forumPost, setForumPost] = useState<ForumPost>();

    const getForumList = useCallback(async () => {
        onLoading();
        await obtainForumThreads()
            .then(async (response) => {
                const result = response as ForumPost[];

                const postsWithUsernames = await Promise.all(
                    result.map(async (post) => {
                        try {
                            const user: User = await obtainUser(post.userId.toString());
                            return {
                                ...post,
                                username: user.username
                            };
                        } catch {
                            return {
                                ...post
                            };
                        }
                    })
                );

                setForumList(postsWithUsernames);
                onSuccess();
            })
            .catch((error) => {
                onError(error);
            });
    }, [onLoading, onSuccess, onError]);

    const getForumPost = useCallback(async (postId: number) => {
        onLoading();
        await obtainForumThread(postId)
            .then(async (response) => {
                let post = response as ForumPost;

                // Obtener username del autor del post
                try {
                    const user: User = await obtainUser(post.userId.toString());
                    post = { ...post, username: user.username };
                } catch {
                    // Si falla, dejar el username como está
                }

                // Obtener username de cada comment
                const commentsWithUsernames = await Promise.all(
                    post.comments.map(async (comment) => {
                        try {
                            const user: User = await obtainUser(comment.userId.toString());
                            return { ...comment, username: user.username };
                        } catch {
                            return comment;
                        }
                    })
                );

                setForumPost({ ...post, comments: commentsWithUsernames });
                onSuccess();
            })
            .catch((error) => {
                onError(error);
            });
    }, [onLoading, setForumPost, onSuccess, onError]);

    const createPost = useCallback(async (post: { title: string; content: string; userId: number }) => {
        onLoading();
        await createForumThread(post)
            .then((response) => {
                    setForumPost(response);
                    onSuccess();
                })
            .catch((error) => {
                    onError(error);
                })
    }, [onLoading, setForumPost, onSuccess, onError]);

    const createComment = useCallback(async (comment: { content: string; userId: number; threadId: number }) => {
        onLoading();
        await createForumComment(comment)
            .then((response) => {
                setForumPost(response);
                onSuccess();
            })
            .catch((error) => {
                onError(error);
            })
    }, [onLoading, setForumPost, onSuccess, onError]);

    const deleteForumComment = useCallback(async (commentId: number) => {
        console.log("Deleting comment with ID:", commentId);
        await deleteForumThreadComment(commentId)
    }, []);

    const deleteForumPost = useCallback(async (postId: number) => {
        await deleteForumThread(postId)
    }, []);

    return {
        forumList,        
        forumStatus,
        forumPost,
        setForumPost,
        getForumList,
        getForumPost,
        createPost,
        createComment,
        deleteForumComment,
        deleteForumPost
    };
};


