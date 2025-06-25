import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../../hooks/useUser";
import { useQuiz } from "../../../../../hooks/useQuiz";
import { CommunityWriterMainContainer } from "../../../../../common/communityWriterContainer/CommunityWriterMainContainer";
import "./CreateQuiz.css";

export const CreateQuiz: React.FC = () => {
    const { getLoggedUser, userStatusLog, loggedUser } = useUser();
    const { createNewQuiz, quizStatus } = useQuiz();
    const navigate = useNavigate();

    const [quizData, setQuizData] = useState({
        title: "",
        description: "",
        totalScore: 10,
        questions: [
            {
                questionText: "",
                correctAnswer: "",
                answers: ["", "", "", ""]
            }
        ]
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        getLoggedUser();
    }, []);

    useEffect(() => {
        if (userStatusLog.error) {
            navigate("/community/login");
        }
        if (loggedUser?.role === 1) {
            navigate("/community/admin/menu");
        }
        if (loggedUser?.role === 2) {
            navigate("/community/menu");
        }
    }, [userStatusLog, loggedUser, navigate]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!quizData.title.trim()) {
            newErrors.title = "Title is required";
        }

        if (!quizData.description.trim()) {
            newErrors.description = "Description is required";
        }

        quizData.questions.forEach((question, qIndex) => {
            if (!question.questionText.trim()) {
                newErrors[`question-${qIndex}-text`] = "Question text is required";
            }

            if (!question.correctAnswer.trim()) {
                newErrors[`question-${qIndex}-correct`] = "Correct answer is required";
            }

            question.answers.forEach((answer, aIndex) => {
                if (!answer.trim()) {
                    newErrors[`question-${qIndex}-answer-${aIndex}`] = "Answer cannot be empty";
                }
            });

            if (!question.answers.includes(question.correctAnswer)) {
                newErrors[`question-${qIndex}-correct`] = "Correct answer must match one of the options";
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await createNewQuiz(quizData);
            navigate("/community/writer/quiz");
        } catch (error) {
            console.error("Error creating quiz:", error);
        }
    };

    const handleQuestionChange = (qIndex: number, field: string, value: string) => {
        const updatedQuestions = [...quizData.questions];
        updatedQuestions[qIndex] = {
            ...updatedQuestions[qIndex],
            [field]: value
        };
        setQuizData({ ...quizData, questions: updatedQuestions });
    };

    const handleAnswerChange = (qIndex: number, aIndex: number, value: string) => {
        const updatedQuestions = [...quizData.questions];
        updatedQuestions[qIndex].answers[aIndex] = value;
        setQuizData({ ...quizData, questions: updatedQuestions });
    };

    const addQuestion = () => {
        setQuizData({
            ...quizData,
            questions: [
                ...quizData.questions,
                {
                    questionText: "",
                    correctAnswer: "",
                    answers: ["", "", "", ""]
                }
            ]
        });
    };

    const removeQuestion = (qIndex: number) => {
        if (quizData.questions.length <= 1) return;
        
        const updatedQuestions = [...quizData.questions];
        updatedQuestions.splice(qIndex, 1);
        setQuizData({ ...quizData, questions: updatedQuestions });
    };

    return (
        <CommunityWriterMainContainer>
            <div className="create-quiz-container">
                <h1>Create New Quiz</h1>
                
                <form onSubmit={handleSubmit} className="quiz-form">
                    <div className="form-group">
                        <label htmlFor="title">Quiz Title</label>
                        <input
                            id="title"
                            type="text"
                            value={quizData.title}
                            onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
                            className={errors.title ? "error" : ""}
                        />
                        {errors.title && <span className="error-message">{errors.title}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={quizData.description}
                            onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
                            className={errors.description ? "error" : ""}
                            rows={3}
                        />
                        {errors.description && <span className="error-message">{errors.description}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="totalScore">Total Score</label>
                        <input
                            id="totalScore"
                            type="number"
                            min="1"
                            value={quizData.totalScore}
                            onChange={(e) => setQuizData({ ...quizData, totalScore: parseInt(e.target.value) || 10 })}
                        />
                    </div>

                    <div className="questions-section">
                        <h2>Questions</h2>
                        {quizData.questions.map((question, qIndex) => (
                            <div key={qIndex} className="question-card">
                                <div className="question-header">
                                    <h3>Question {qIndex + 1}</h3>
                                    <button
                                        type="button"
                                        onClick={() => removeQuestion(qIndex)}
                                        className="remove-question-button"
                                        disabled={quizData.questions.length <= 1}
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div className="form-group">
                                    <label htmlFor={`question-${qIndex}-text`}>Question Text</label>
                                    <input
                                        id={`question-${qIndex}-text`}
                                        type="text"
                                        value={question.questionText}
                                        onChange={(e) => handleQuestionChange(qIndex, "questionText", e.target.value)}
                                        className={errors[`question-${qIndex}-text`] ? "error" : ""}
                                    />
                                    {errors[`question-${qIndex}-text`] && (
                                        <span className="error-message">{errors[`question-${qIndex}-text`]}</span>
                                    )}
                                </div>

                                <div className="answers-group">
                                    <label>Answers</label>
                                    {question.answers.map((answer, aIndex) => (
                                        <div key={aIndex} className="answer-input">
                                            <input
                                                type="text"
                                                value={answer}
                                                onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
                                                className={errors[`question-${qIndex}-answer-${aIndex}`] ? "error" : ""}
                                                placeholder={`Option ${aIndex + 1}`}
                                            />
                                            {errors[`question-${qIndex}-answer-${aIndex}`] && (
                                                <span className="error-message">
                                                    {errors[`question-${qIndex}-answer-${aIndex}`]}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="form-group">
                                    <label htmlFor={`question-${qIndex}-correct`}>Correct Answer</label>
                                    <select
                                        id={`question-${qIndex}-correct`}
                                        value={question.correctAnswer}
                                        onChange={(e) => handleQuestionChange(qIndex, "correctAnswer", e.target.value)}
                                        className={errors[`question-${qIndex}-correct`] ? "error" : ""}
                                    >
                                        <option value="">Select correct answer</option>
                                        {question.answers.map((answer, aIndex) => (
                                            <option 
                                                key={aIndex} 
                                                value={answer}
                                                disabled={!answer.trim()}
                                            >
                                                {answer || `Option ${aIndex + 1}`}
                                            </option>
                                        ))}
                                    </select>
                                    {errors[`question-${qIndex}-correct`] && (
                                        <span className="error-message">{errors[`question-${qIndex}-correct`]}</span>
                                    )}
                                </div>
                            </div>
                        ))}

                        <button type="button" onClick={addQuestion} className="add-question-button">
                            Add Question
                        </button>
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={() => navigate("/community/writer/quiz")} className="cancel-button">
                            Cancel
                        </button>
                        <button type="submit" className="submit-button" disabled={quizStatus.loading}>
                            {quizStatus.loading ? "Creating..." : "Create Quiz"}
                        </button>
                    </div>
                </form>
            </div>
        </CommunityWriterMainContainer>
    );
};