import React from "react";
import "../../assets/css/user/UsersList.css";
import Card from "../UIElements/Card";
import UserItem from "./UserItem";

const UsersList = (props) => {
    if (props.users.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>NO User Found</h2>
                </Card>
            </div>
        );
    }
    return (
        <ul className="users-list">
            {props.users.map((user) => {
                return (
                    <UserItem
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        image={user.image}
                        placeCount={user.places.length}
                    />
                );
            })}
        </ul>
    );
};

export default UsersList;
