import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../login/LoginPage.css';
import { CommunityMainContainer } from "../../../common/communityMainContainer/CommunityMainContainer";
import { useUser } from "../../../hooks/useUser";
import { User } from "../../../types/user";

export const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { getUserList, createNewUser } = useUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const newUser : User = {
            username,
            email,
            password,
            isActive: true,
            role: 1,
        };

        try {
            createNewUser(newUser);
            await getUserList();
            navigate("/community/login");
        } catch (err) {
            setError("An error occurred while creating the user");
        }
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
