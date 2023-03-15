import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/FormElement/Input";
import "../../assets/css/places/PlaceForm.css";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validator";
import Button from "../../components/FormElement/Button";
import { useForm } from "../../hooks/formHook";
import { useHttpClient } from "../../hooks/HttpHook";
import { AuthContext } from "../../components/context/auth-context";
import ErrorModal from "../../components/UIElements/ErrorModal";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import ImageUpload from "../../components/FormElement/ImageUpload";

const NewPlace = () => {
    const auth = useContext(AuthContext);
    const { error, sendRequest, isLoading, clearError } = useHttpClient();
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
            placeImage: {
                value: null,
                isValid: false,
            },
        },
        false
    );

    const history = useNavigate(); // use to navigate from one component to another component

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", formState.inputs.title.value);
            formData.append("description", formState.inputs.description.value);
            formData.append("address", formState.inputs.address.value);
            formData.append("creator", auth.userId);
            formData.append("placeImage", formState.inputs.placeImage.value);
            await sendRequest("/places/create", "POST", formData, {
                Authorization: "Bearer " + auth.token,
            });
            history("/");
        } catch (error) {}
    };

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            <form className="place-form" onSubmit={formSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
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
                <ImageUpload
                    center
                    id="placeImage"
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please Choose the Image"
                />
                <Button type="submit" disabled={!formState.isValid}>
                    ADD PLACE
                </Button>
            </form>
        </>
    );
};

export default NewPlace;
