export interface QuizQuestion {
    questionId: number;
    questionText: string;
    answers: string[];
    correctAnswer?: string;
}

export interface UserQuizResult {
    userId: number;
    puntuation: number;
}

export interface Quiz {
    quizId: number;
    questionText: string;
    correctAnswer: string;
    questions: QuizQuestion[];
    usersDone: UserQuizResult[];
}

export interface UserQuiz {
    quizId: number;
    title: string;
    description: string;
    isCompleted: boolean;
    scoreObtained: number | null;
}

export interface SubmitQuiz {
    quizId: number;
    userId: number;
    questionIds: number[];
    answers: string[];
}

export interface CreateQuiz {
    title: string;
    description: string;
    totalScore: number;
    questions: {
        questionText: string;
        correctAnswer: string;
        answers: string[];
    }[];
}