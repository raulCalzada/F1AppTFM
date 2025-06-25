import { useEffect, useState } from "react";
import { useUser } from "../../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../../../hooks/useQuiz";
import "./ListQuizzesAdmin.css";
import { CommunityAdminMainContainer } from "../../../../common/communityAdminMainContiner/CommunityAdminMainContainer";
import { Quiz } from "../../../../types/quiz";

export const ListQuizzesAdmin: React.FC = () => {
    const { getLoggedUser, userStatusLog, loggedUser } = useUser();
    const { 
        quizList, 
        getQuizList, 
        quizStatus,
        deleteQuiz
    } = useQuiz();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
    const [showUserScores, setShowUserScores] = useState<number | null>(null);

    useEffect(() => {
        getLoggedUser();
        getQuizList();
    }, []);

    useEffect(() => {
        if (userStatusLog.error) {
            navigate("/community/login");
        }
        if (loggedUser?.role === 2) {
            navigate("/community/menu");
        }
        if (loggedUser?.role === 3) {
            navigate("/community/writer/menu");
        }
    }, [userStatusLog, loggedUser, navigate]);

    useEffect(() => {
        if (!search) {
            setFilteredQuizzes(quizList || []);
        } else {
            setFilteredQuizzes(
                (quizList || []).filter(quiz => 
                    quiz.quizId.toString().includes(search) ||
                    quiz.questionText.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
    }, [search, quizList]);

    const handleDeleteQuiz = async (quizId: number) => {
        if (window.confirm("Are you sure you want to delete this quiz?")) {
            try {
                await deleteQuiz(quizId);
                getQuizList(); // Refresh the list
            } catch (error) {
                console.error("Error deleting quiz:", error);
            }
        }
    };

    const toggleUserScores = (quizId: number) => {
        setShowUserScores(showUserScores === quizId ? null : quizId);
    };

    return (
        <CommunityAdminMainContainer>
            <div className="quizzes-admin-container">
                <h1>Quizzes Page</h1>
                
                <div className="admin-controls">
                    <input
                        type="text"
                        placeholder="Search by ID or question"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {quizStatus.loading ? (
                    <div>Loading quizzes...</div>
                ) : (
                    <table className="quizzes-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Question</th>
                                <th>Description</th>
                                <th>Participants</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredQuizzes?.map((quiz) => (
                                <>
                                    <tr key={quiz.quizId}>
                                        <td>{quiz.quizId}</td>
                                        <td>{quiz.questionText}</td>
                                        <td>{quiz.correctAnswer}</td>
                                        <td>{quiz.usersDone?.length || 0}</td>
                                        <td className="actions-cell">
                                            <button 
                                                onClick={() => toggleUserScores(quiz.quizId)}
                                                className="scores-button"
                                            >
                                                {showUserScores === quiz.quizId ? 'Hide Scores' : 'Show Scores'}
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteQuiz(quiz.quizId)}
                                                className="delete-button"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                    {showUserScores === quiz.quizId && (
                                        <tr className="scores-row">
                                            <td colSpan={5}>
                                                <div className="user-scores-container">
                                                    <h4>User Scores</h4>
                                                    {quiz.usersDone?.length ? (
                                                        <table className="scores-table">
                                                            <thead>
                                                                <tr>
                                                                    <th>User ID</th>
                                                                    <th>Score</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {quiz.usersDone.map((userDone, index) => (
                                                                    <tr key={index}>
                                                                        <td>{userDone.userId}</td>
                                                                        <td>{userDone.puntuation}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    ) : (
                                                        <p>No participants yet</p>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </CommunityAdminMainContainer>
    );
};