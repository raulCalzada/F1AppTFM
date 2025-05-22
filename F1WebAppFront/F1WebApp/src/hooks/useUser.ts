import { useCallback, useState } from "react";
import { getAllUsers, obtainUser, obtainUserByUsername } from "../api/user";
import { User } from "../types/user";
import { useStatus, useStatus2 } from "./useStatus";

export const useUser = () => {
    const { status: userStatus, onSuccess, onError, onLoading } = useStatus();
    const { status2: userStatusLog, onSuccess2: onSuccessLog, onError2: onErrorLog, onLoading2: onLoadingLog } = useStatus2();
    const [user, setUser] = useState<User | null>(null);
    const [userList, setUserList] = useState<User[]>([]);
    const [deletedUser, setDeletedUser] = useState<User | null>(null);
    const [loggedUser, setLoggedUser] = useState<User | null>(null);

    const getUserById = useCallback(async (userId: string) => {
        onLoading();
        obtainUser(userId)
            .then((response) => {
                setUser(response);
                onSuccess(response ? `User ${response.username} fetched successfully` : '');
            })
            .catch((error) => {
                onError(error.message);
            });
    }, [onSuccess, onError, onLoading]);

    const getUserByUsername = useCallback(async (username: string) => {
        onLoading();
        obtainUserByUsername(username)
            .then((response) => {
                setUser(response);
                onSuccess(response ? `User ${response.username} fetched successfully` : '');
            })
            .catch((error) => {
                onError(error.message);
            });
    }, [onSuccess, onError, onLoading]);
    

    const getUserList = useCallback(async () => {
        onLoading();
        getAllUsers()
            .then((response) => {
                setUserList(response);
                onSuccess(response ? `User list fetched successfully` : '');
            })
            .catch((error) => {
                onError(error.message);
            });
    }, [onSuccess, onError, onLoading]);


    const deleteUser = useCallback(async (userId: string) => {
        onLoading();
        deleteUser(userId)
            .then((response) => {
                setDeletedUser(response);
                if(deletedUser?.id === null){
                    onError('User not found');
                }
                })
            .catch((error) => {
                onError(error.message);
            });
    }, [onSuccess, onError, onLoading]);
        
    const updateUser = useCallback(async (userId: string, userData: User) => {
        onLoading();
        updateUser(userId, userData)
            .then((response) => {
                setUser(response);
                onSuccess(response ? `User ${response.username} updated successfully` : '');
            })
            .catch((error) => {
                onError(error.message);
            });
    }, [onSuccess, onError, onLoading]);

    const getUserIdFromCookies = () => {
        const userId = document.cookie.match(new RegExp('(^| )userId=([^;]+)'));
        return userId ? decodeURIComponent(userId[2]) : null;
    };

    const setUserIdInCookies = (userId: string) => {
        document.cookie = `userId=${encodeURIComponent(userId)}; path=/;`;
    };


    ///Login and Logout
    const logUser = useCallback(async (userId: string) => {
        onLoadingLog();
        obtainUser(userId)
            .then((response) => {
                setLoggedUser(response);
                setUserIdInCookies(userId);
                onSuccessLog(response ? `User ${response.username} logged in successfully` : '');
            })
            .catch((error) => {
                onErrorLog(error.message);
            }); 
    }, [onSuccessLog, onErrorLog, onLoadingLog]);

    const logoutUser = useCallback(() => {
        onLoadingLog();
        setLoggedUser(null);
        setUserIdInCookies('');
        onSuccessLog('User logged out successfully');
    }, [onSuccessLog, onLoadingLog]);

    const getLoggedUser = useCallback(() => {
        onLoadingLog();
        const userId = getUserIdFromCookies();
        if (userId) {
            obtainUser(userId)
                .then((response) => {
                    setLoggedUser(response);
                    onSuccessLog(response ? `User ${response.username} logged in successfully` : '');
                })
                .catch((error) => {
                    onErrorLog(error.message);
                });
        } else {
            setLoggedUser(null);
        }
    }, [onLoadingLog, onSuccessLog, onErrorLog]);

    return {
        user,
        userList,
        userStatus,
        userStatusLog,
        getUserById,
        getUserByUsername,
        getUserList,
        deleteUser,
        updateUser,       
    };
}