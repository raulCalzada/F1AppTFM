export interface ArticleComment {
    id: number;
    comment: string;
    createDate: string;
    userId: number;
    username: string;
}

export interface Article {
    id: number;
    title: string;
    subtitle: string;
    content: string;
    imageUrl1: string;
    imageUrl2: string;
    authorId: number;
    username: string;
    createDate: string;
    comments: ArticleComment[];
}

