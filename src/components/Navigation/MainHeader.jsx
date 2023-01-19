import React from "react";
import "../../assets/css/navigation/MainHeader.css";

const MainHeader = (props) => {
    return <header className="main-header">{props.children}</header>;
};
export default MainHeader;
