import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/navigation/Navbar.css";
import Backdrop from "../UIElements/Backdrop";
import MainHeader from "./MainHeader";
import NavItems from "./NavItems";
import SideDrawer from "./SideDrawer";

const Navbar = (props) => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    return (
        <>
            {sidebarIsOpen && (
                <Backdrop onClick={() => setSidebarIsOpen(false)} />
            )}
            <SideDrawer
                show={sidebarIsOpen}
                onClick={() => setSidebarIsOpen(false)}
            >
                <nav className="main-navigation__drawer-nav">
                    <NavItems />
                </nav>
            </SideDrawer>
            <MainHeader>
                <button
                    className="main-navigation__menu-btn"
                    onClick={() => setSidebarIsOpen(true)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <h1 className="main-navigation__title">
                    <Link to={"/"}>Your Places</Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <NavItems />
                </nav>
            </MainHeader>
        </>
    );
};
export default Navbar;
