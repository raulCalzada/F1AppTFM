import React, { useEffect, useState } from "react";
import './Votes.css';
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../hooks/useUser";
import { CommunityMainContainer } from "../../../../common/communityMainContainer/CommunityMainContainer";
import { useVote } from "../../../../hooks/useVotes";

export const Votes: React.FC = () => {
    const { getLoggedUser, userStatusLog, loggedUser } = useUser();
    const {
        voteList,
        selectedVote,
        getVoteList,
        getVoteById,
        submitVote,
        setSelectedVote,
        voteStatus
    } = useVote();

    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        getLoggedUser();
        getVoteList();
    }, []);

    useEffect(() => {
        if (userStatusLog.error) navigate("/community/login");
    }, [userStatusLog, navigate]);

    useEffect(() => {
        if (selectedVote && loggedUser) {
            const userHasVoted = selectedVote.votes?.some(vote => vote.userId === loggedUser.userId) ?? false;
            setHasVoted(userHasVoted);
        }
    }, [selectedVote, loggedUser]);

    if (voteStatus.loading || !loggedUser) return <div>Loading...</div>;

    const activeVotes = voteList.filter(vote => vote.status === 1);

    const handleVoteSelection = async (id: number) => {
        await getVoteById(id);
        setSelectedOption(null);
    };

    const handleVoteSubmit = async () => {
        if (selectedVote && selectedOption !== null && loggedUser) {
            await submitVote(
                selectedVote.id,
                selectedOption + 1,
                loggedUser.userId
            );
            await getVoteList();
            await getVoteById(selectedVote.id);
        }
    };

    const handleCloseModal = () => {
        setSelectedVote(undefined);
        setSelectedOption(null);
        setHasVoted(false);
    };

    return (
        <CommunityMainContainer>
            <div className="votes-list-container-vote">
                <h2 className="votes-list-title-vote">Active Votes!</h2>
                <h3>👀 Vote if you haven't 👀</h3>
                {activeVotes.length === 0 ? (
                    <p className="no-votes-message-vote">No active votes at the moment.</p>
                ) : (
                    <div className="votes-grid-vote">
                        {activeVotes.map((vote) => (
                            <div 
                                key={vote.id} 
                                className="vote-card-vote"
                                onClick={() => handleVoteSelection(vote.id)}
                            >
                                <div className="vote-card-content-vote">
                                    <h4>{vote.question}</h4>
                                    <div className="vote-options-preview-vote">
                                        {vote.options?.map((option, index) => (
                                            <span key={index} className="option-tag-vote">
                                                {option}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="vote-count-vote">{(vote.votes || []).length} votes</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedVote && (
                <div className="modal-backdrop-vote">
                    <div className="modal-content-vote" onClick={(e) => e.stopPropagation()}>
                        <h2 className="vote-question-title-vote">{selectedVote.question}</h2>
                        
                        {hasVoted ? (
                            <div className="already-voted-message-vote">
                                You have already voted on this poll.
                            </div>
                        ) : (
                            <div className="vote-options-vote">
                                {selectedVote.options?.map((option, index) => (
                                    <div 
                                        key={index} 
                                        className={`option-item-vote ${selectedOption === index ? 'selected-vote' : ''}`}
                                        onClick={() => setSelectedOption(index)}
                                    >
                                        <span>{option}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {hasVoted && (
                            <div className="vote-stats-vote">
                                <h4>Current Results:</h4>
                                {selectedVote.options?.map((option, index) => {
                                    const votes = selectedVote.votes || [];
                                    const optionVotes = votes.filter(
                                        v => v.voteOption === index + 1
                                    ).length;
                                    const totalVotes = votes.length;
                                    const percentage = totalVotes > 0 
                                        ? Math.round((optionVotes / totalVotes) * 100) 
                                        : 0;
                                    
                                    return (
                                        <div key={index} className="stat-item-vote">
                                            <span className="stat-option-vote">{option}</span>
                                            <div className="stat-bar-container-vote">
                                                <div 
                                                    className="stat-bar-vote" 
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                            <span className="stat-percentage-vote">{percentage}%</span>
                                            <span className="stat-count-vote">({optionVotes} votes)</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <div className="modal-actions-vote">
                            {!hasVoted && (
                                <button 
                                    className="btn-submit-vote" 
                                    onClick={handleVoteSubmit}
                                    disabled={selectedOption === null}
                                >
                                    Submit Vote
                                </button>
                            )}
                            <button className="btn-cancel-vote" onClick={handleCloseModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </CommunityMainContainer>
    );
};