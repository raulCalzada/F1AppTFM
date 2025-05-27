export interface ForumComment {
    id: number;
    comment: string;
    createDate: string;
    userId: number;
    username: string;
}

export interface ForumPost {
    id: number;
    title: string;
    description: string;
    userId: number;
    username: string;
    comments: ForumComment[];
}