import React, { useEffect } from "react";
import './QuizList.css';
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../../hooks/useUser";
import { useQuiz } from "../../../../../hooks/useQuiz";
import { CommunityMainContainer } from "../../../../../common/communityMainContainer/CommunityMainContainer";

export const QuizList: React.FC = () => {
    const { getLoggedUser, userStatusLog, loggedUser } = useUser();
    const {
        userQuizList = [],
        getUserQuizList,
        quizStatus
    } = useQuiz();

    const navigate = useNavigate();

    useEffect(() => {
        getLoggedUser();
    }, []);

    useEffect(() => {
        if (loggedUser?.userId) {
            getUserQuizList(loggedUser.userId);
        }
    }, [loggedUser]);

    useEffect(() => {
        if (userStatusLog.error) navigate("/community/login");
    }, [userStatusLog, navigate]);

    if (quizStatus.loading || !loggedUser) return <div>Loading...</div>;

    const completedQuizzes = userQuizList.filter(quiz => quiz?.isCompleted);
    const availableQuizzes = userQuizList.filter(quiz => !quiz?.isCompleted);

    return (
        <CommunityMainContainer>
            <div className="quizzes-container">
                {completedQuizzes.length > 0 && (
                    <div className="quizzes-section">
                        <h2 className="quizzes-section-title">Your Completed Quizzes</h2>
                        <div className="quizzes-grid">
                            {completedQuizzes.map((quiz, index) => (
                                <div key={`completed-${index}`} className="quiz-card completed">
                                    <div className="quiz-card-content">
                                        <h3>{quiz?.title || 'Untitled Quiz'}</h3>
                                        <p>{quiz?.description || 'No description available'}</p>
                                        <div className="quiz-score">
                                            <span>Your score: {quiz?.scoreObtained ?? 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="quizzes-section">
                    <h2 className="quizzes-section-title">Available Quizzes</h2>
                    {availableQuizzes.length === 0 ? (
                        <p className="no-quizzes-message">No quizzes available at the moment.</p>
                    ) : (
                        <div className="quizzes-grid">
                            {availableQuizzes.map((quiz, index) => (
                                <div 
                                    key={`available-${index}`}
                                    className="quiz-card available"
                                    onClick={() => navigate(`/community/quiz/${quiz.quizId}`)}
                                >
                                    <div className="quiz-card-content">
                                        <h3>{quiz?.title || 'Untitled Quiz'}</h3>
                                        <p>{quiz?.description || 'No description available'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </CommunityMainContainer>
    );
};