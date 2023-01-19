import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Button from "../../components/FormElement/Button";
import Input from "../../components/FormElement/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validator";
import "../../assets/css/places/PlaceForm.css";
import { DUMMY_PLACES } from "./UserPlaces";
import { useForm } from "../../hooks/formHook";
import Card from "../../components/UIElements/Card";

const UpdatePlace = (props) => {
    const [isLoading, setIsLoading] = useState(true);
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
    const placeData = DUMMY_PLACES.find((p) => p.id === placeId);

    useEffect(() => {
        if (placeData) {
            setFormData(
                {
                    title: {
                        value: placeData.title,
                        isValid: true,
                    },
                    description: {
                        value: placeData.description,
                        isValid: true,
                    },
                },
                true
            );
        }
        setIsLoading(false);
    }, [placeData, setFormData]);

    if (!placeData) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find this Place</h2>
                </Card>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        );
    }

    const UpdateFormHandler = (e) => {
        e.preventDefault();
        console.log(formState.inputs, "updateformsubmit");
    };

    return (
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
    );
};

export default UpdatePlace;
