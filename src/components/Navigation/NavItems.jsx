import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../../assets/css/navigation/NavItems.css";
import { AuthContext } from "../context/auth-context";

const NavItems = (props) => {
    const auth = useContext(AuthContext);

    return (
        <ul className="nav-links">
            <li>
                <NavLink to={"/"} exact="true">
                    ALL USERS
                </NavLink>
            </li>
            {auth.isLoggedIn && (
                <>
                    <li>
                        <NavLink to={"/users/u1/places"} exact="true">
                            ALL PLACES
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/places/create"} exact="true">
                            ADD PLACE
                        </NavLink>
                    </li>
                    <li>
                        <button onClick={auth.logout}>LOGOUT</button>
                    </li>
                </>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to={"/auth"} exact="true">
                        AUTHENTICATE
                    </NavLink>
                </li>
            )}
        </ul>
    );
};
export default NavItems;
