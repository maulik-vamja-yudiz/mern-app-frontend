import { Navigate, Route, Routes } from "react-router-dom";
import User from "./pages/user/User";
import NewPlace from "./pages/places/NewPlace";
import Navbar from "./components/Navigation/Navbar";
import UpdatePlace from "./pages/places/UpdatePlace";
import UserPlaces from "./pages/places/UserPlaces";
import Auth from "./pages/auth/Auth";
import { AuthContext } from "./components/context/auth-context";
import { useCallback, useState } from "react";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const login = useCallback(() => {
        setIsLoggedIn(true);
    }, []);
    const logout = useCallback(() => {
        setIsLoggedIn(false);
    }, []);

    let routes;

    if (isLoggedIn) {
        routes = (
            <>
                <Route path="/" element={<User />} exact="true" />
                <Route
                    path="/users/:userId/places"
                    element={<UserPlaces />}
                    exact="true"
                />
                <Route path="/places/:placeId" element={<UpdatePlace />} />
                <Route path="/places/create" element={<NewPlace />} />
                <Route path="*" element={<Navigate to="" />} />
            </>
        );
    } else {
        routes = (
            <>
                <Route path="/" element={<User />} exact="true" />
                <Route
                    path="/users/:userId/places"
                    element={<UserPlaces />}
                    exact="true"
                />
                <Route path="/auth" element={<Auth />} exact="true" />
                <Route path="*" element={<Navigate to="/auth" />} />
            </>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                login: login,
                logout: logout,
            }}
        >
            <>
                <Navbar />
                <main>
                    <Routes>{routes}</Routes>
                </main>
            </>
        </AuthContext.Provider>
    );
};

export default App;
