import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../login/LoginPage.css';
import { CommunityMainContainer } from "../../../common/communityMainContainer/CommunityMainContainer";

export const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setError("");
        navigate("/login");
    };

    return (
        <CommunityMainContainer>
            <div className="actual-menu-community">
                <div className="main-card-community login-card">
                    <p className="main-card-title-community">Register</p>
                    
                    {error && <div className="dropdown-error">{error}</div>}

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
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                        <div className="login-input-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">
                            Create Account
                        </button>
                    </form>

                    <p className="login-register-text">
                        Already have an account?{" "}
                        <Link to="/community/login" className="login-register-link">
                            Log in here
                        </Link>
                    </p>
                </div>
            </div>
        </CommunityMainContainer>
    );
};
