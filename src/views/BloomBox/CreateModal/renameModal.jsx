import React from "react";
import { Button, ButtonToolbar } from "reactstrap";
import { useState, useCallback, useEffect } from "react";
import "./CreateModal.scss";

function RenameModal({ closeModal }) {
    let onMint = () => {};
    const [quantity, setQuantity] = React.useState("");
    const [name, setName] = React.useState("");
    return (
        <>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="modalTitle">
                        {" "}
                        <p>Rename BloomBox</p> <button onClick={() => closeModal(false)}> X </button>
                    </div>
                    <div className="modalBody">
                        <div className="setFlex modalFlex">
                            <label className="labelname setLeft">Name: </label>
                            <div className="setFlex1 sto">
                                <input className="getDownlineWallet osm input1" type="text" name="name" />
                            </div>
                        </div>
                        <div className="setFlex modalFlex">
                            <div className="modalTitle">
                                <label className="labelname setLeft">Rename tax : 10% </label>
                            </div>
                        </div>
                    </div>
                    <div className="modalFooter">
                        <ButtonToolbar className="form__button-toolbar12">
                            <Button color="primary" type="submit" className="swapButton createBbutton" onClick={() => closeModal(false)}>
                                Rename
                            </Button>
                        </ButtonToolbar>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RenameModal;
