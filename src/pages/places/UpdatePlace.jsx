import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Button from "../../components/FormElement/Button";
import Input from "../../components/FormElement/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validator";
import { useForm } from "../../hooks/formHook";
import Card from "../../components/UIElements/Card";
import { useHttpClient } from "../../hooks/HttpHook";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import ErrorModal from "../../components/UIElements/ErrorModal";
import { AuthContext } from "../../components/context/auth-context";
import "../../assets/css/places/PlaceForm.css";

const UpdatePlace = (props) => {
    const auth = useContext(AuthContext);
    const { error, sendRequest, isLoading, clearError } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();
    const navigate = useNavigate();
    const placeId = useParams().placeId;
    const [formState, inputHandler, setFormData] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
        },
        false
    );
    // const placeData = DUMMY_PLACES.find((p) => p.id === placeId);
    useEffect(() => {
        const fetchedPlace = async () => {
            try {
                const responseData = await sendRequest(`/places/${placeId}`);
                setLoadedPlace(responseData.place);
                setFormData(
                    {
                        title: {
                            value: responseData.place.title,
                            isValid: true,
                        },
                        description: {
                            value: responseData.place.description,
                            isValid: true,
                        },
                    },
                    true
                );
            } catch (error) {}
        };
        fetchedPlace();
    }, [sendRequest, placeId, setFormData]);

    if (!loadedPlace) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find this Place</h2>
                </Card>
            </div>
        );
    }

    if (isLoading && !error) {
        return (
            <div className="center">
                <LoadingSpinner asOverlay />
            </div>
        );
    }

    const UpdateFormHandler = async (e) => {
        try {
            await sendRequest(
                `/places/update/${placeId}`,
                "PATCH",
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                }),
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth.token,
                }
            );
            navigate("/users/" + auth.userId + "/places");
        } catch (error) {}
    };

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedPlace && (
                <form className="place-form" onSubmit={UpdateFormHandler}>
                    <Input
                        element="input"
                        id="title"
                        type="text"
                        label="Title"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid Title"
                        onInput={inputHandler}
                        initialValue={formState.inputs.title.value}
                        initialValid={formState.inputs.title.isValid}
                    />
                    <Input
                        element="textarea"
                        id="description"
                        label="Discription"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid Discription (atleast min 5 character)"
                        onInput={inputHandler}
                        initialValue={formState.inputs.description.value}
                        initialValid={formState.inputs.description.isValid}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        UPDATE PLACE
                    </Button>
                </form>
            )}
        </>
    );
};

export default UpdatePlace;
