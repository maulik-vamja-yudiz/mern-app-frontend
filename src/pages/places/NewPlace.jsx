import React, { useCallback, useReducer } from "react";
import Input from "../../components/FormElement/Input";
import "../../assets/css/places/PlaceForm.css";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validator";
import Button from "../../components/FormElement/Button";
import { useForm } from "../../hooks/formHook";

const NewPlace = () => {
    const [formState, inputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
            address: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const formSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formState.inputs);
    };

    return (
        <form className="place-form" onSubmit={formSubmitHandler}>
            <Input
                id="title"
                type="text"
                label="Title"
                element="input"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter a valid Title"
            />
            <Input
                id="description"
                label="Description"
                element="textarea"
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput={inputHandler}
                errorText="Please enter a valid Description(at least 5 characters)"
            />
            <Input
                id="address"
                label="Address"
                element="input"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter a valid Address"
            />

            <Button type="submit" disabled={!formState.isValid}>
                ADD PLACE
            </Button>
        </form>
    );
};

export default NewPlace;
