import { useCallback, useEffect, useState } from "react";

let logOutTimer;

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [tokenExpiry, setTokenExpiry] = useState();
    const [userID, setUserID] = useState();

    const login = useCallback((uid, token, tokenExpireIn) => {
        setToken(token);
        setUserID(uid);
        const tokenExpireTime =
            tokenExpireIn || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpiry(tokenExpireTime);
        localStorage.setItem(
            "user-data",
            JSON.stringify({
                userId: uid,
                token: token,
                tokenExpiry: tokenExpireTime.toISOString(),
            })
        );
    }, []);
    const logout = useCallback(() => {
        setToken(null);
        setTokenExpiry(null);
        setUserID(null);
        localStorage.removeItem("user-data");
    }, []);

    useEffect(() => {
        if (token && tokenExpiry) {
            const remainingTime = tokenExpiry.getTime() - new Date().getTime();
            logOutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logOutTimer);
        }
    }, [token, logout, tokenExpiry]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user-data"));
        if (
            userData &&
            userData.token &&
            new Date(userData.tokenExpiry) > new Date()
        )
            login(
                userData.userId,
                userData.token,
                new Date(userData.tokenExpiry)
            );
    }, [login]);

    return { token, userID, login, logout };
};
