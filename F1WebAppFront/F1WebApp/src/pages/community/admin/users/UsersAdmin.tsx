import { useEffect, useState } from "react";
import { CommunityAdminMainContainer } from "../../../../common/communityAdminMainContiner/CommunityAdminMainContainer";
import { useUser } from "../../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { User } from "../../../../types/user";
import "./UsersAdmin.css";

const emptyUser: Omit<User, "userId" | "createDate" | "lastUpdateDate"> = {
    username: "",
    email: "",
    password: "",
    isActive: true,
    role: 2,
};

export const UsersAdmin: React.FC = () => {
    const { getLoggedUser, userStatusLog, loggedUser, getUserList, userList, updateUser } = useUser();
    const navigate = useNavigate();

    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [form, setForm] = useState<typeof emptyUser>(emptyUser);

    // Buscador
    const [search, setSearch] = useState("");
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    useEffect(() => {
        getLoggedUser();
        getUserList();
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
        if (!search) {
            setFilteredUsers(userList || []);
        } else {
            setFilteredUsers(
                (userList || []).filter(
                    (user) =>
                        user.userId.toString().includes(search) ||
                        user.username.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
    }, [search, userList]);

    const handleEditWindowUser = (user: User) => {
        setEditingUser(user);
        setForm({
            username: user.username,
            email: user.email,
            password: "",
            isActive: user.isActive,
            role: user.role,
        });
    };

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingUser) {
            const updatedUser: User = {
                ...editingUser,
                ...form,
                lastUpdateDate: new Date().toLocaleString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                }).replace(",", ""),
            };

            if (updatedUser.password === "" || updatedUser.password === undefined) {
                updatedUser.password = editingUser.password;
            }
            if (updatedUser.username === "" || updatedUser.username === undefined) {
                updatedUser.username = editingUser.username;
            }
            if (updatedUser.email === "" || updatedUser.email === undefined) {
                updatedUser.email = editingUser.email;
            }

            await updateUser(editingUser.userId.toString(), updatedUser);
            setEditingUser(null);
            setForm(emptyUser);
            window.location.reload();
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        const { name, value, type } = target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (target as HTMLInputElement).checked : value,
        }));
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
        setForm(emptyUser);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <CommunityAdminMainContainer>
            <div className="users-admin-container">
                <h1>Users Admin Page</h1>
                <div style={{ marginBottom: 16 }}>
                    <input
                        type="text"
                        placeholder="Seach by ID or username"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
                {editingUser && (
                    <form onSubmit={handleUpdateUser} style={{ marginBottom: 20 }}>
                        <input
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleFormChange}
                            required
                        />
                        <input
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleFormChange}
                            required
                            type="email"
                        />
                        <input
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleFormChange}
                            type="password"
                        />
                        <select name="role" value={form.role} onChange={handleFormChange}>
                            <option value={1}>Admin</option>
                            <option value={2}>User</option>
                            <option value={3}>Writer</option>
                        </select>
                        <label>
                            Active
                            <input
                                name="isActive"
                                type="checkbox"
                                checked={form.isActive}
                                onChange={handleFormChange}
                            />
                        </label>
                        <button type="submit">Update</button>
                        <button type="button" onClick={handleCancelEdit}>Cancel</button>
                    </form>
                )}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers?.map((user) => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role === 1 ? "Admin" : user.role === 2 ? "User" : "Writer"}</td>
                                <td>{user.isActive ? "Yes" : "No"}</td>
                                <td>
                                    <button onClick={() => handleEditWindowUser(user)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CommunityAdminMainContainer>
    );
};
