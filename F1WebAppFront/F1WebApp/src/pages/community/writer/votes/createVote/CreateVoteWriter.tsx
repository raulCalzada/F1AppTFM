import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../../hooks/useUser";
import { useVote } from "../../../../../hooks/useVotes";
import { CommunityWriterMainContainer } from "../../../../../common/communityWriterContainer/CommunityWriterMainContainer";
import "./CreateVoteWriter.css";

export const CreateVoteWriter: React.FC = () => {
    const { getLoggedUser, userStatusLog, loggedUser } = useUser();
    const { createQuestion, voteStatus } = useVote();
    const navigate = useNavigate();

    const [voteData, setVoteData] = useState({
        question: "",
        status: 1,
        options: ["", ""]
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        getLoggedUser();
    }, []);

    useEffect(() => {
        if (userStatusLog.error) {
            navigate("/community/login");
        }
        if (loggedUser?.role === 2) {
            navigate("/community/menu");
        }
    }, [userStatusLog, loggedUser, navigate]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!voteData.question.trim()) {
            newErrors.question = "Question is required";
        }

        voteData.options.forEach((option, index) => {
            if (!option.trim()) {
                newErrors[`option-${index}`] = "Option cannot be empty";
            }
        });

        // Check for duplicate options
        const uniqueOptions = new Set(voteData.options.map(opt => opt.toLowerCase().trim()));
        if (uniqueOptions.size < voteData.options.length) {
            newErrors.options = "Options must be unique";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await createQuestion(voteData);
            navigate("/community/writer/vote");
        } catch (error) {
            console.error("Error creating vote:", error);
        }
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...voteData.options];
        newOptions[index] = value;
        setVoteData({ ...voteData, options: newOptions });
    };

    const addOption = () => {
        if (voteData.options.length < 5) {
            setVoteData({
                ...voteData,
                options: [...voteData.options, ""]
            });
        }
    };

    const removeOption = (index: number) => {
        if (voteData.options.length > 2) {
            const newOptions = [...voteData.options];
            newOptions.splice(index, 1);
            setVoteData({ ...voteData, options: newOptions });
        }
    };

    return (
        <CommunityWriterMainContainer>
            <div className="create-vote-container">
                <h1>Create New Vote</h1>
                
                <form onSubmit={handleSubmit} className="vote-form">
                    <div className="form-group">
                        <label htmlFor="question">Question</label>
                        <input
                            id="question"
                            type="text"
                            value={voteData.question}
                            onChange={(e) => setVoteData({ ...voteData, question: e.target.value })}
                            className={errors.question ? "error" : ""}
                            placeholder="Enter your voting question"
                        />
                        {errors.question && <span className="error-message">{errors.question}</span>}
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <select
                            value={voteData.status}
                            onChange={(e) => setVoteData({ ...voteData, status: Number(e.target.value) })}
                            className="status-select"
                        >
                            <option value={1}>Active</option>
                            <option value={2}>Inactive</option>
                            <option value={3}>Historic</option>
                        </select>
                    </div>

                    <div className="options-section">
                        <label>Options (2-5)</label>
                        {errors.options && <span className="error-message">{errors.options}</span>}
                        {voteData.options.map((option, index) => (
                            <div key={index} className="option-row">
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    className={errors[`option-${index}`] ? "error" : ""}
                                    placeholder={`Option ${index + 1}`}
                                />
                                {voteData.options.length > 2 && (
                                    <button
                                        type="button"
                                        onClick={() => removeOption(index)}
                                        className="remove-option-button"
                                    >
                                        Remove
                                    </button>
                                )}
                                {errors[`option-${index}`] && (
                                    <span className="error-message">{errors[`option-${index}`]}</span>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addOption}
                            className="add-option-button"
                            disabled={voteData.options.length >= 5}
                        >
                            Add Option
                        </button>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={() => navigate("/community/writer/vote")}
                            className="cancel-button"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="submit-button"
                            disabled={voteStatus.loading}
                        >
                            {voteStatus.loading ? "Creating..." : "Create Vote"}
                        </button>
                    </div>
                </form>
            </div>
        </CommunityWriterMainContainer>
    );
};