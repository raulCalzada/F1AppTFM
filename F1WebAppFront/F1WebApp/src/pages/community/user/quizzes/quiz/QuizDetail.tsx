import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './QuizDetail.css';
import { useUser } from "../../../../../hooks/useUser";
import { useQuiz } from "../../../../../hooks/useQuiz";
import { CommunityMainContainer } from "../../../../../common/communityMainContainer/CommunityMainContainer";

export const QuizDetail: React.FC = () => {
    const { quizId } = useParams<{ quizId: string }>();
    const { getLoggedUser, userStatusLog, loggedUser } = useUser();
    const {
        selectedQuiz,
        getQuizById,
        submitUserQuiz,
        quizStatus
    } = useQuiz();

    const navigate = useNavigate();
    const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});

    useEffect(() => {
        getLoggedUser();
        if (quizId) {
            getQuizById(Number(quizId));
        }
    }, []);

    useEffect(() => {
        if (userStatusLog.error) navigate("/community/login");
    }, [userStatusLog, navigate]);


    const handleAnswerSelect = (questionId: number, answer: string) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const handleSubmitQuiz = async () => {
        if (!selectedQuiz || !loggedUser) return;

        const allQuestionsAnswered = selectedQuiz.questions.every(
            question => selectedAnswers[question.questionId]
        );

        if (!allQuestionsAnswered) {
            alert("Please answer all questions before submitting.");
            return;
        }

        const submitData = {
            quizId: selectedQuiz.quizId,
            userId: loggedUser.userId,
            questionIds: selectedQuiz.questions.map(q => q.questionId),
            answers: selectedQuiz.questions.map(q => selectedAnswers[q.questionId])
        };
        console.log("Submitting quiz data:", submitData);

            submitUserQuiz(submitData);
            navigate(`/community/quiz`);
    };

    if (quizStatus.loading || !loggedUser || !selectedQuiz) {
        return <div>Loading...</div>;
    }

    return (
        <CommunityMainContainer>
            <div className="quiz-detail-container">
                <h2 className="quiz-title">{selectedQuiz.questionText}</h2>
                <p className="quiz-description">{selectedQuiz.correctAnswer}</p>
                
                <div className="questions-container">
                    {selectedQuiz.questions.map((question) => (
                        <div key={question.questionId} className="question-card">
                            <h3 className="question-text">{question.questionText}</h3>
                            
                            <div className="answers-container">
                                {question.answers.map((answer, index) => (
                                    <div 
                                        key={index}
                                        className={`answer-option ${
                                            selectedAnswers[question.questionId] === answer ? 'selected' : ''
                                        }`}
                                        onClick={() => handleAnswerSelect(question.questionId, answer)}
                                    >
                                        <span>{answer}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="quiz-actions">
                    <button 
                        className="btn-submit-quiz"
                        onClick={handleSubmitQuiz}
                        disabled={
                            Object.keys(selectedAnswers).length !== selectedQuiz.questions.length
                        }
                    >
                        Submit Quiz
                    </button>
                    <button 
                        className="btn-cancel-quiz"
                        onClick={() => navigate('/community/quiz')}
                    >
                        Back to Quizzes
                    </button>
                </div>
            </div>
        </CommunityMainContainer>
    );
};