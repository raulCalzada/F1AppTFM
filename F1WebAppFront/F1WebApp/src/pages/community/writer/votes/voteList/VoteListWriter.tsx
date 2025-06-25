import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../../hooks/useUser";
import "./VoteListWriter.css";
import { useVote } from "../../../../../hooks/useVotes";
import { CommunityWriterMainContainer } from "../../../../../common/communityWriterContainer/CommunityWriterMainContainer";

export const VoteListWriter: React.FC = () => {
    const { getLoggedUser, userStatusLog, loggedUser } = useUser();
    const {
        voteList,
        getVoteList,
        voteStatus,
        deleteVoteQuestion,
        updateQuestionStatus
    } = useVote();

    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<number | "all">("all");
    const [filteredVotes, setFilteredVotes] = useState<typeof voteList>([]);

    useEffect(() => {
        getLoggedUser();
        getVoteList();
    }, []);

    useEffect(() => {
        if (userStatusLog.error) {
            navigate("/community/login");
        }
        if (loggedUser?.role === 2) {
            navigate("/community/menu");
        }
    }, [userStatusLog, loggedUser, navigate]);

    useEffect(() => {
        let result = voteList || [];

        if (search) {
            result = result.filter(vote =>
                vote.id.toString().includes(search) ||
                vote.question.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (statusFilter !== "all") {
            result = result.filter(vote => vote.status === statusFilter);
        }

        setFilteredVotes(result);
    }, [search, statusFilter, voteList]);


    const handleStatusChange = async (id: number, newStatus: number) => {
        try {
            await updateQuestionStatus(newStatus, id);
            getVoteList();
        } catch (error) {
            console.error("Error updating vote status:", error);
        }
    };

    const getStatusColor = (status: number) => {
        switch (status) {
            case 1: return 'status-active';
            case 2: return 'status-inactive';
            case 3: return 'status-historic';
            default: return '';
        }
    };

    const getStatusText = (status: number) => {
        switch (status) {
            case 1: return 'Active';
            case 2: return 'Inactive';
            case 3: return 'Historic';
            default: return 'Unknown';
        }
    };

    return (
        <CommunityWriterMainContainer>
            <div className="votes-writer-container">
                <h1>Votes Panel</h1>

                <div className="writer-controls">
                    <input
                        type="text"
                        placeholder="Search by ID or question"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value === "all" ? "all" : Number(e.target.value))
                        }
                        className="status-filter-select"
                    >
                        <option value="all">All</option>
                        <option value="1">Active</option>
                        <option value="2">Inactive</option>
                        <option value="3">Historic</option>
                    </select>
                    <button
                        onClick={() => navigate("/community/writer/vote/create")}
                        className="create-vote-button"
                    >
                        Create New Vote
                    </button>
                </div>

                {voteStatus.loading ? (
                    <div>Loading votes...</div>
                ) : (
                    <table className="votes-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Question</th>
                                <th>Status</th>
                                <th>Options</th>
                                <th>Votes</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVotes?.map((vote) => (
                                <tr key={vote.id}>
                                    <td>{vote.id}</td>
                                    <td>{vote.question}</td>
                                    <td className={getStatusColor(vote.status)}>
                                        {getStatusText(vote.status)}
                                    </td>
                                    <td>
                                        <ul className="options-list">
                                            {vote.options.map((option, index) => (
                                                <li key={index}>{option}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>{vote.votes?.length || 0}</td>
                                    <td className="options-list">
                                        <select
                                            value={vote.status}
                                            onChange={(e) =>
                                                handleStatusChange(vote.id, Number(e.target.value))
                                            }
                                            className="status-select"
                                        >
                                            <option value={1}>Active</option>
                                            <option value={2}>Inactive</option>
                                            <option value={3}>Historic</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </CommunityWriterMainContainer>
    );
};
