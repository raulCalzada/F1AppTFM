import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../hooks/useUser";
import "./VoteListAdmin.css";
import { useVote } from "../../../../hooks/useVotes";
import { CommunityAdminMainContainer } from "../../../../common/communityAdminMainContiner/CommunityAdminMainContainer";

export const VoteListAdmin: React.FC = () => {
    const { getLoggedUser, userStatusLog, loggedUser } = useUser();
    const {
        voteList,
        getVoteList,
        voteStatus,
        deleteVoteQuestion,
        updateQuestionStatus,
        givePointsToOption
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

    const handleDeleteVote = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this vote?")) {
            try {
                await deleteVoteQuestion(id);
                getVoteList();
            } catch (error) {
                console.error("Error deleting vote:", error);
            }
        }
    };

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
        <CommunityAdminMainContainer>
            <div className="votes-admin-container">
                <h1>Votes Panel</h1>

                <div className="admin-controls">
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
                                                <li key={index}>
                                                    <span>{option}</span>
                                                    <button
                                                        className="give-points-button"
                                                        onClick={() => {
                                                            const points = parseInt(prompt("How many points to give?", "10") || "0");
                                                            if (points > 0) {
                                                                givePointsToOption(vote.id, index + 1, points);
                                                            }
                                                        }}
                                                    >
                                                        Give Points
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>{vote.votes?.length || 0}</td>
                                    <td className="actions-cell">
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
                                        <button
                                            onClick={() => handleDeleteVote(vote.id)}
                                            className="delete-button"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </CommunityAdminMainContainer>
    );
};
