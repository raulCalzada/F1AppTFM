import { useCallback, useState } from "react";
import { getAllUsers, obtainUser, obtainUserByUsername } from "../api/user";
import { User } from "../types/user";
import { useStatus, useStatus2 } from "./useStatus";

export const useUser = () => {
    const { status: userStatus, onSuccess, onError, onLoading } = useStatus();
    const { status: userStatusLog, onSuccess2, onError2, onLoading2} = useStatus2();
    const [user, setUser] = useState<User>();
    const [userList, setUserList] = useState<User[]>([]);
    const [deletedUser, setDeletedUser] = useState<User>();
    const [loggedUser, setLoggedUser] = useState<User>();

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
        console.log('Setting user ID in cookies...', userId);
        if (userId === undefined || userId === null || userId === '') {
            console.error('User ID is undefined');
            return;
        }
        document.cookie = `userId=${encodeURIComponent(userId)}; path=/;`;
    };


    ///Login and Logout
    const logUser = useCallback(async (username: string, password: string) => {
        onLoading2();
        obtainUserByUsername(username)
            .then((response) => {
                if (response && response.password === password) {   
                    setLoggedUser(response);              
                    console.log(response.userId);                   
                    setUserIdInCookies(response.userId);
                    onSuccess2();
                }
                else {
                    onError2('Invalid username or password');
                }
            })
            .catch((error) => {
                onError2(error.message);
            }); 
    }, [onLoading2, onSuccess2, onError2]);

    const logoutUser = useCallback(async () => {
        onLoading2();
        document.cookie = "userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        onSuccess2('User logged out successfully');
    }, [onLoading2, onSuccess2]);

    const getLoggedUser = useCallback(async() => {
        onLoading2();
        const userId = getUserIdFromCookies();
        if (userId) {
            await obtainUser(userId)
                .then((response) => {
                    setLoggedUser(response);
                    onSuccess2(response ? `User ${response.username} logged in successfully` : '');
                })
                .catch((error) => {
                    onError2(error.message);
                });
        } else {
            onError2('No user ID found in cookies');
        }
    }, [onLoading2, onSuccess2, onError2]);



    return {
        user,
        loggedUser,
        userList,
        userStatus,
        userStatusLog,
        getUserById,
        getUserByUsername,
        getUserList,
        logUser,
        getLoggedUser,
        logoutUser,
        deleteUser,
        updateUser,       
    };
}