import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/FormElements/ImageUpload.css";
import Button from "./Button";

const ImageUpload = (props) => {
    const filePickerRef = useRef();
    const [file, setFile] = useState();
    const [filePreviewUrl, setFilePreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (!file) return;
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setFilePreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickedImageHandler = (e) => {
        let pickedFile;
        let fileIsValid = isValid;
        // console.log(event.target.value);
        if (e.target.files && e.target.files.length !== 0) {
            pickedFile = e.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            fileIsValid = false;
            setIsValid(false);
        }

        props.onInput(props.id, pickedFile, fileIsValid);
    };

    return (
        <div className="form-conterol">
            <input
                type="file"
                ref={filePickerRef}
                id={props.id}
                style={{ display: "none" }}
                accept=".jpg,.png,.jpeg"
                onChange={pickedImageHandler}
            />
            <div className={`image-upload ${props.center && "center"}`}>
                <div className="image-upload__preview">
                    {filePreviewUrl ? (
                        <img src={filePreviewUrl} alt="Preview" />
                    ) : (
                        <p>Please Pick an Image</p>
                    )}
                </div>
                <Button
                    type="button"
                    onClick={() => filePickerRef.current.click()}
                >
                    Pick Image
                </Button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    );
};

export default ImageUpload;
