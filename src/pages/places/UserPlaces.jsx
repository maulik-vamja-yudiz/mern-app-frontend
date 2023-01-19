import React from "react";
import { useParams } from "react-router";
import PlaceList from "../../components/places/PlaceList";

export const DUMMY_PLACES = [
    {
        id: "p1",
        title: "Place Title",
        description: "this is a placeholder for place description",
        image: "https://lh5.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=w408-h272-k-no",
        address: "220 W 34th St., New York, NY 10001, United States",
        location: {
            lat: 40.7484405,
            lng: -73.9878531,
        },
        creator: "u1",
    },
    {
        id: "p2",
        title: "Place Title 2",
        description: "this is a placeholder for place description",
        image: "https://lh5.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=w408-h272-k-no",
        address: "220 W 34th St., New York, NY 10001, United States",
        location: {
            lat: 40.7484405,
            lng: -73.9878531,
        },
        creator: "u2",
    },
];

const UserPlaces = () => {
    const userId = useParams().userId;
    const userPlaces = DUMMY_PLACES.filter((user) => user.creator === userId);
    return <PlaceList places={userPlaces} />;
};

export default UserPlaces;
