import React from "react";
import "../../assets/css/places/PlaceList.css";
import Button from "../FormElement/Button";
import Card from "../UIElements/Card";
import PlaceListItem from "./PlaceListItem";

const PlaceList = (props) => {
    if (props.places.length === 0) {
        return (
            <div className="place-list center">
                <Card>
                    <h2>No Places found. Maybe Create one?</h2>
                    <Button to="/places/create">Share Place</Button>
                </Card>
            </div>
        );
    }
    return (
        <ul className="place-list">
            {props.places.map((place) => (
                <PlaceListItem
                    key={place.id}
                    id={place.id}
                    title={place.title}
                    image={place.image}
                    description={place.description}
                    address={place.address}
                    creatorId={place.creator}
                    coordinates={place.location}
                />
            ))}
        </ul>
    );
};
export default PlaceList;
