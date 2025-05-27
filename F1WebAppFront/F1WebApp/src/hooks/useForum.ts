import { User } from './../types/user.d';
import { useCallback, useState } from "react";
import { useStatus } from "./useStatus";
import { ForumPost } from "../types/forum";
import { createForumComment, createForumThread, obtainForumThread, obtainForumThreads } from "../api/forum";
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
            .then((response) => {
                setForumPost(response);
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
        onLoading();
        await deleteForumComment(commentId)
            .then (() => {
                getForumPost(forumPost?.id);
            })
            .catch((error) => {
                onError(error);
            });
    }, [onLoading, getForumPost, forumPost?.id, onError]);

    const deleteForumPost = useCallback(async (postId: number) => {
        onLoading();
        await deleteForumComment(postId)
            .then(() => {
                getForumList();
            })
            .catch((error) => {
                onError(error);
            });
    }, [onLoading, deleteForumComment, getForumList, onError]);


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
