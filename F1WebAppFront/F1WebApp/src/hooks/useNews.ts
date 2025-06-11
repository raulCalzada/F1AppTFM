import { useCallback, useState } from "react";
import { useStatus } from "./useStatus";
import { Article } from "../types/article";
import {obtainNews, obtainNewsById, createNews, editNews, deleteNews, createComment, deleteComment, updateComment} from "../api/news";
import { obtainUser } from "../api/user";
import { User } from "../types/user";

export const useNews = () => {
  const [newsList, setNewsList] = useState<Article[]>([]);
  const [newsArticle, setNewsArticle] = useState<Article>();
  const { status: newsStatus, onLoading, onSuccess, onError } = useStatus();

  const getNewsList = useCallback(async () => {
    onLoading();
    await obtainNews()
      .then(async (articles) => {
        const articlesWithUsernames = await Promise.all(
          articles.map(async (article) => {
            try {
              const user: User = await obtainUser(article.userId.toString());
              return {
                ...article,
                username: user.username,
              };
            } catch {
              return article;
            }
          })
        );
        setNewsList(articlesWithUsernames);
        onSuccess();
      })
      .catch(onError);
  }, [onLoading, onSuccess, onError]);

  const getNewsArticle = useCallback(
    async (id: string) => {
      onLoading();
      await obtainNewsById(id)
        .then(async (article) => {
          try {
            const user: User = await obtainUser(article.authorId.toString());
            article = { ...article, username: user.username };
          } catch {}

          const commentsWithUsernames = await Promise.all(
            article.comments.map(async (comment) => {
              try {
                const user: User = await obtainUser(comment.userId.toString());
                return { ...comment, username: user.username };
              } catch {
                return comment;
              }
            })
          );

          setNewsArticle({ ...article, comments: commentsWithUsernames });
          onSuccess();
        })
        .catch(onError);
    },
    [onLoading, onSuccess, onError]
  );

  const createArticle = useCallback(
    async (data: Article) => {
      onLoading();
      await createNews(data)
        .then((created) => {
          setNewsArticle(created);
          onSuccess();
        })
        .catch(onError);
    },
    [onLoading, onSuccess, onError]
  );

  const updateArticle = useCallback(
    async (id: string, data: Article) => {
      onLoading();
      await editNews(id, data)
        .then((updated) => {
          setNewsArticle(updated);
          onSuccess();
        })
        .catch(onError);
    },
    [onLoading, onSuccess, onError]
  );

  const removeArticle = useCallback(
    async (id: string) => {
      onLoading();
      await deleteNews(id).then(onSuccess).catch(onError);
    },
    [onLoading, onSuccess, onError]
  );

  const addComment = useCallback(
    async (commentData: {
      articleId: string;
      content: string;
      userId: number;
    }) => {
      onLoading();
      await createComment(commentData)
        .then((updatedArticle) => {
          setNewsArticle(updatedArticle);
          onSuccess();
        })
        .catch(onError);
    },
    [onLoading, onSuccess, onError]
  );

  const removeComment = useCallback(
    async (articleId: number, commentId: number) => {
      await deleteComment(articleId, commentId);
    },
    []
  );

  const editComment = useCallback(
    async (articleId: number, commentId: number, content: string) => {
      await updateComment(articleId, commentId, content);
    },
    []
  );

  return {
    newsList,
    newsStatus,
    newsArticle,
    setNewsArticle,
    getNewsList,
    getNewsArticle,
    createArticle,
    updateArticle,
    removeArticle,
    addComment,
    removeComment,
    editComment,
  };
};
