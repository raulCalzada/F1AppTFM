export interface User {
    userId : number
    username: string;
    email: string;
    password: string;
    createDate: string | null; 
    lastUpdateDate: string | null;
    isActive: boolean;
    role: number; // 1: admin, 2: user, 3: writer
    points: number;
}

