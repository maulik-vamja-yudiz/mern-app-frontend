import React, { useContext, useState } from "react";
import Card from "../../components/UIElements/Card";
import Input from "../../components/FormElement/Input";
import Button from "../../components/FormElement/Button";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import "../../assets/css/auth/Auth.css";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../util/validator";
import { useForm } from "../../hooks/formHook";
import { AuthContext } from "../../components/context/auth-context";
import ErrorModal from "../../components/UIElements/ErrorModal";
import { useHttpClient } from "../../hooks/HttpHook";
import ImageUpload from "../../components/FormElement/ImageUpload";

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const switchModeHandler = () => {
        if (!isLoggedIn) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined,
                    userImage: undefined,
                },
                formState.inputs.email.isValid &&
                    formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: "",
                        isValid: false,
                    },
                    userImage: {
                        value: null,
                        isValid: false,
                    },
                },
                false
            );
        }
        setIsLoggedIn((prevMode) => !prevMode);
    };

    const authFormHandler = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            try {
                const formData = new FormData();
                formData.append("name", formState.inputs.name.value);
                formData.append("email", formState.inputs.email.value);
                formData.append("password", formState.inputs.password.value);
                formData.append("userImage", formState.inputs.userImage.value);
                console.log(formData);
                const responseData = await sendRequest(
                    "/signup",
                    "POST",
                    formData
                );
                auth.login(responseData.user.id, responseData.token);
            } catch (error) {}
        } else {
            try {
                const responseData = await sendRequest(
                    `/login`,
                    "POST",
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    }),
                    { "Content-Type": "application/json" }
                );
                auth.login(responseData.user.id, responseData.token);
            } catch (error) {}
        }
    };

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Login</h2>
                <hr />
                <form onSubmit={authFormHandler}>
                    {!isLoggedIn && (
                        <>
                            <Input
                                id="name"
                                label="Your Name"
                                element="input"
                                type="text"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Please enter your name"
                                onInput={inputHandler}
                            />
                            <ImageUpload
                                center
                                id="userImage"
                                onInput={inputHandler}
                            />
                        </>
                    )}
                    <Input
                        id="email"
                        element="input"
                        type="email"
                        label="E-Mail"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter Valid Email Address"
                        onInput={inputHandler}
                    />
                    <Input
                        id="password"
                        element="input"
                        type="password"
                        label="Password"
                        validators={[
                            VALIDATOR_REQUIRE(),
                            VALIDATOR_MINLENGTH(6),
                        ]}
                        errorText="Please enter your Valid Password and Password must be at least 6 characters long"
                        onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        {isLoggedIn ? "LOGIN" : "SIGNUP"}
                    </Button>
                </form>
                <Button inverse onClick={switchModeHandler}>
                    Switch to {isLoggedIn ? "SIGNUP" : "LOGIN"}
                </Button>
            </Card>
        </>
    );
};

export default Auth;
