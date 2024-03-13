import React from "react";
import { Button, ButtonToolbar } from "reactstrap";
import { useState, useCallback, useEffect } from "react";
import "./CreateModal.scss";
import { approveBloombox, createFlower, addFlower, approveBloomboxNCTR } from "src/store/slices/bloombox-thunk";
import { IReduxState } from "../../../store/slices/state.interface";
import { useWeb3Context } from "src/hooks";
import { useDispatch, useSelector } from "react-redux";
import { sleep } from "src/helpers";
import { trim } from "src/helpers";
function AddModal({ closeModal, isApprovedNctr, nctrBalance, idOfNode }) {
    const [quantity, setQuantity] = React.useState("");
    const [name, setName] = React.useState("");

    const maxClickEvent = () => {
        setQuantity(trim(Number(nctrBalance), 2));
        return "";
    };

    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();

    const handleChangeValue = value => {
        setQuantity(value);
        return "";
    };

    const handleChangeName = value => {
        setName(value);
        return "";
    };

    const dispatch = useDispatch();

    const handleClick = async () => {
        if (await checkWrongNetwork()) {
            return;
        } else {
            if (idOfNode != "" && quantity != "" && Number(quantity) > 0) {
                const id = idOfNode.toString();
                dispatch(addFlower({ id, quantity, provider, address, networkID: chainID }));
                closeModal(false);
            }
        }
    };

    const handleApprove = async () => {
        if (await checkWrongNetwork()) {
            return;
        } else {
            dispatch(approveBloomboxNCTR({ provider, address, networkID: chainID }));
        }
    };

    return (
        <>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="modalTitle">
                        {" "}
                        <p>Add Tokens</p> <button onClick={() => closeModal(false)}> X </button>
                    </div>
                    <div className="modalBody">
                        <div className="setFlex modalFlex">
                            <label className="labelname setLeft">Add More $NCTR Tokens To BloomBox </label>
                        </div>
                        <div className="setFlex modalFlex">
                            <div className="modalTitle">
                                <label className="labelname setLeft">Tokens: </label>
                                <label className="labelname setLeft">Available: {nctrBalance} $NCTR </label>
                            </div>
                            <div className="setFlex1 sto">
                                <input
                                    className="getDownlineWallet osm input1"
                                    name="price"
                                    type="number"
                                    placeholder="$NCTR"
                                    value={quantity}
                                    onChange={value => handleChangeValue(value.target.value ? value.target.value : undefined)}
                                />
                                <input className="getDownlineWallet dvs maxHeight" type="submit" value="Max" onClick={maxClickEvent} />
                            </div>
                        </div>
                    </div>
                    <div className="modalFooter">
                        <ButtonToolbar className="form__button-toolbar12">
                            <Button
                                color="primary"
                                type="submit"
                                className="swapButton createBbutton"
                                onClick={async () => {
                                    await handleClick();
                                    await sleep(10);
                                }}
                            >
                                Add
                            </Button>
                            <Button
                                color="primary"
                                type="submit"
                                className="swapButton createBbutton"
                                onClick={async () => {
                                    await handleApprove();
                                    await sleep(10);
                                }}
                            >
                                Approve
                            </Button>
                        </ButtonToolbar>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddModal;
