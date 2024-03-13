import React from "react";
import { Button, ButtonToolbar } from "reactstrap";
import { useState, useCallback, useEffect } from "react";
import "./CreateModal.scss";
import { airdropFlower, approveBloombox, createFlower } from "src/store/slices/bloombox-thunk";
import { IReduxState } from "../../../store/slices/state.interface";
import { useWeb3Context } from "src/hooks";
import { useDispatch, useSelector } from "react-redux";
import { sleep } from "src/helpers";

function TransferModal({ closeModal, idOfNode }) {
    let onMint = () => {};
    const [quantity, setQuantity] = React.useState("");
    const [wallet, setWallet] = React.useState("");
    const [name, setName] = React.useState("");

    const dispatch = useDispatch();
    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();

    const handleClick = async () => {
        if (await checkWrongNetwork()) {
            return;
        } else {
            dispatch(airdropFlower({ wallet, idOfNode, provider, address, networkID: chainID }));

            closeModal(false);
        }
    };

    const handleClickApex = async () => {
        if (await checkWrongNetwork()) {
            return;
        } else {
            dispatch(airdropFlower({ wallet: "0x264a875a5d35ee98d51267526eac91edc81dbe01", idOfNode, provider, address, networkID: chainID }));

            closeModal(false);
        }
    };
    const handleChangeWallet = value => {
        setWallet(value);
        return "";
    };
    return (
        <>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="modalTitle">
                        {" "}
                        <p>Airdrop</p> <button onClick={() => closeModal(false)}> X </button>
                    </div>
                    <div className="setFlex modalFlex">
                        <label className="labelname setLeft">Wallet</label>
                        <div className="setFlex1 sto">
                            <input
                                className="getDownlineWallet osm input1"
                                type="text"
                                name="name"
                                onChange={value => handleChangeWallet(value.target.value ? value.target.value : "")}
                            />
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
                                Airdrop
                            </Button>
                            <Button
                                color="primary"
                                type="submit"
                                className="swapButton createBbutton"
                                onClick={async () => {
                                    await handleClickApex();
                                    await sleep(10);
                                }}
                            >
                                Send to Apex{" "}
                            </Button>
                        </ButtonToolbar>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TransferModal;
