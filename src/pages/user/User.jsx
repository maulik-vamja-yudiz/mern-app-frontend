import React, { useEffect, useState } from "react";
import ErrorModal from "../../components/UIElements/ErrorModal";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import UsersList from "../../components/user/UsersList";
import { useHttpClient } from "../../hooks/HttpHook";

const User = () => {
    const [loadedUsers, setLoadedUsers] = useState();
    const { sendRequest, error, clearError, isLoading } = useHttpClient();
    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const responseData = await sendRequest("/users");
                setLoadedUsers(responseData.users);
            } catch (error) {}
        };
        fetchRequest();
    }, [sendRequest]);

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedUsers && <UsersList users={loadedUsers} />}
        </>
    );
};

export default User;
