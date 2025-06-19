import { useCallback, useState } from "react";
import { useStatus } from "./useStatus";
import { VoteQuestion } from "../types/question";
import { addNewQuestion, changeQuestionStatus, getVotesById, obtainQuestions, vote } from "../api/votes";


export const useVote = () => {
    const [voteList, setVoteList] = useState<VoteQuestion[]>([]);
    const [selectedVote, setSelectedVote] = useState<VoteQuestion>();
    const { status: voteStatus, onSuccess, onError, onLoading } = useStatus();

    const getVoteList = useCallback(async () => {
        onLoading();
        try {
            const result = await obtainQuestions();
            setVoteList(result);
            onSuccess();
        } catch (error) {
            onError(error);
        }
    }, [onLoading, onSuccess, onError]);

    const getVoteById = useCallback(async (id: number) => {
        onLoading();
        try {
            const result = await getVotesById(id);
            setSelectedVote(result);
            onSuccess();
        } catch (error) {
            onError(error);
        }
    }, [onLoading, onSuccess, onError]);

    const createQuestion = useCallback(async (question: { question: string; status: number; options: string[] }) => {
        onLoading();
        try {
            const result = await addNewQuestion(question);
            setSelectedVote(result);
            onSuccess();
        } catch (error) {
            onError(error);
        }
    }, [onLoading, onSuccess, onError]);

    const deleteVoteQuestion = useCallback(async (id: number) => {
        onLoading();
        try {
            await deleteQuestion(id);
            onSuccess();
        } catch (error) {
            onError(error);
        }
    }, [onLoading, onSuccess, onError]);

    const updateQuestionStatus = useCallback(async (status: number, id: number) => {
        onLoading();
        try {
            const result = await changeQuestionStatus(status, id);
            setSelectedVote(result);
            onSuccess();
        } catch (error) {
            onError(error);
        }
    }, [onLoading, onSuccess, onError]);

    const submitVote = useCallback(async (id: number, option: string, userId: number) => {
        onLoading();
        try {
            const result = await vote(id, option, userId);
            setSelectedVote(result);
            onSuccess();
        } catch (error) {
            onError(error);
        }
    }, [onLoading, onSuccess, onError]);

    
    return {
        voteList,
        selectedVote,
        voteStatus,
        getVoteList,
        getVoteById,
        createQuestion,
        deleteVoteQuestion,
        updateQuestionStatus,
        submitVote,
        setSelectedVote
    };
};
