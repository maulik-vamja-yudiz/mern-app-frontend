import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import PlaceList from "../../components/places/PlaceList";
import { useHttpClient } from "../../hooks/HttpHook";
import ErrorModal from "../../components/UIElements/ErrorModal";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import { AuthContext } from "../../components/context/auth-context";

export const DUMMY_PLACES = [];

const UserPlaces = () => {
    const auth = useContext(AuthContext);
    const { error, sendRequest, isLoading, clearError } = useHttpClient();
    const [userPlaces, setUserPlaces] = useState();
    const userId = useParams().userId;
    useEffect(() => {
        const fetchUserPlaces = async () => {
            try {
                const responseData = await sendRequest(
                    `/places/user/${userId}`,
                    "GET",
                    null,
                    {
                        Authorization: "Bearer " + auth.token,
                    }
                );
                setUserPlaces(responseData.places);
            } catch (error) {}
        };
        fetchUserPlaces();
    }, [sendRequest, userId, auth.token]);

    const placeDeletedHandler = (deletedPlaceId) => {
        setUserPlaces((prevPlaces) =>
            prevPlaces.filter((place) => place.id !== deletedPlaceId)
        );
    };

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner asOverlay />
                </div>
            )}
            {!isLoading && userPlaces && (
                <PlaceList
                    places={userPlaces}
                    onDeletePlace={placeDeletedHandler}
                />
            )}
        </>
    );
};

export default UserPlaces;
