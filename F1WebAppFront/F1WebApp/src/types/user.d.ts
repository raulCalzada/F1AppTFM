export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    createDate: string;
    lastUpdateDate: string;
    isActive: boolean;
    role: number; // 1: admin, 2: user, 3: writer
}

