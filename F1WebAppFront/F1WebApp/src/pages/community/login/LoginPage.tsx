import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";
import { CommunityMainContainer } from "../../../common/communityMainContainer/CommunityMainContainer";
import { useUser } from "../../../hooks/useUser";

export const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { logUser, userStatusLog} = useUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await logUser(username, password);
    };

    React.useEffect(() => {
    if (userStatusLog.success) {
        console.log("User logged in successfully");
        navigate("/community/menu");
    }
}, [userStatusLog.success, navigate]);

    return (
        <CommunityMainContainer>
            <div className="actual-menu-community">
                <div className="main-card-community login-card">
                    <p className="main-card-title-community">Login</p>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="login-input-group">
                            <label>Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="login-input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button" disabled={userStatusLog === "loading"}>
                            Log In
                        </button>
                        {userStatusLog?.loading && <p className="login-loading-text">Loading...</p>}
                        {userStatusLog?.error && <p className="login-error-text">User or password wrong</p>}
                    </form>
                    <p className="login-register-text">
                        Don't have an account?{" "}
                        <Link to="/community/register" className="login-register-link">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </CommunityMainContainer>
    );
};
