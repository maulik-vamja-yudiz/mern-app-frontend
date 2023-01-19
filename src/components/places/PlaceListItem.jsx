import React, { useContext, useState } from "react";
import "../../assets/css/places/PlaceListItem.css";
import { AuthContext } from "../context/auth-context";
import Button from "../FormElement/Button";
import Card from "../UIElements/Card";
import Map from "../UIElements/Map";
import Modal from "../UIElements/Modal";

const PlaceListItem = (props) => {
    const [showMap, setShowMap] = useState(false);
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const auth = useContext(AuthContext);
    const confirmDeleteHandler = () => {
        setShowDeleteModel(false);
        console.log("Delete");
    };

    return (
        <>
            <Modal
                onCancel={() => setShowMap(false)}
                show={showMap}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={
                    <Button onClick={() => setShowMap(false)}>Close</Button>
                }
            >
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16} />
                </div>
            </Modal>
            <Modal
                show={showDeleteModel}
                onCancel={() => setShowDeleteModel(false)}
                header="Are you Sure.?"
                footerClass="place-item__model-actions"
                footer={
                    <>
                        <Button
                            inverse
                            onClick={() => setShowDeleteModel(false)}
                        >
                            CANCEL
                        </Button>
                        <Button danger onClick={confirmDeleteHandler}>
                            DELETE
                        </Button>
                    </>
                }
            >
                <p>
                    Do you want to proceed the deletion..? you will not undo
                    this action after.
                </p>
            </Modal>
            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button
                            inverse
                            onClick={() => {
                                setShowMap(true);
                            }}
                        >
                            VIEW ON MAP
                        </Button>
                        {auth.isLoggedIn && (
                            <>
                                <Button to={`/places/${props.id}`}>EDIT</Button>
                                <Button
                                    danger
                                    onClick={() => setShowDeleteModel(true)}
                                >
                                    DELETE
                                </Button>
                            </>
                        )}
                    </div>
                </Card>
            </li>
        </>
    );
};

export default PlaceListItem;
