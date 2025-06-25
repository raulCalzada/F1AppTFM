import { useCallback, useState } from "react";
import { useStatus } from "./useStatus";

import { Quiz, UserQuiz, SubmitQuiz, CreateQuiz } from "../types/quiz";
import { createQuiz, getAllQuizzes, getUserQuizzes, obtainQuizById, submitQuiz } from "../api/quiz";

export const useQuiz = () => {
    const [quizList, setQuizList] = useState<Quiz[]>([]);
    const [userQuizList, setUserQuizList] = useState<UserQuiz[]>([]);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz>();
    const { status: quizStatus, onSuccess, onError, onLoading } = useStatus();

    const getQuizList = useCallback(async () => {
        onLoading();
        try {
            const result = await getAllQuizzes();
            setQuizList(result);
            onSuccess();
        } catch (error) {
            onError(error);
        }
    }, [onLoading, onSuccess, onError]);

    const getQuizById = useCallback(async (quizId: number) => {
        console.log("ID:", quizId);
        onLoading();
        try {
            const result = await obtainQuizById(quizId);
            setSelectedQuiz(result);
            onSuccess();
        } catch (error) {
            onError(error);
        }
    }, [onLoading, onSuccess, onError]);

    const getUserQuizList = useCallback(async (userId: number) => {
        onLoading();
        try {
            const result = await getUserQuizzes(userId);
            setUserQuizList(result);
            onSuccess();
        } catch (error) {
            onError(error);
        }
    }, [onLoading, onSuccess, onError]);

    const createNewQuiz = useCallback(async (quizData: CreateQuiz) => {
        onLoading();
        try {
            const result = await createQuiz(quizData);
            setSelectedQuiz(result);
            onSuccess();
        } catch (error) {
            onError(error);
        }
    }, [onLoading, onSuccess, onError]);

    const submitUserQuiz = useCallback(async (submitData: SubmitQuiz) => {
        onLoading();
        try {
            const result = await submitQuiz(submitData);
            if (selectedQuiz && selectedQuiz.quizId === submitData.quizId) {
                setSelectedQuiz(result);
            }
            const updatedUserQuizzes = await getUserQuizzes(submitData.userId);
            setUserQuizList(updatedUserQuizzes);
            onSuccess();
            return result; 
        } catch (error) {
            onError(error);
            throw error; 
        }
    }, [onLoading, onSuccess, onError, selectedQuiz]);

    const deleteQuiz = useCallback(async (quizId: number) => {
        onLoading();
        try {
            deleteQuiz(quizId);
            onSuccess();
        }
        catch (error) {
            onError(error);
        }
    }
    , [onLoading, onSuccess, onError]);

    return {
        quizList,
        userQuizList,
        selectedQuiz,
        quizStatus,
        getQuizList,
        getQuizById,
        getUserQuizList,
        createNewQuiz,
        submitUserQuiz,
        setSelectedQuiz,
        deleteQuiz
    };
};

