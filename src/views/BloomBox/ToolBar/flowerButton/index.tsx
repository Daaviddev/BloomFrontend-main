import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Button, ButtonToolbar } from "reactstrap";
import { useWeb3Context } from "../../../../hooks";
import { createPlanet, compoundAll, claimAll, compoundReward, cashoutReward } from "../../../../store/slices/planet-thunk";
import { IReduxState } from "../../../../store/slices/state.interface";
import { IPendingTxn } from "../../../../store/slices/pending-txns-slice";
import TxModal from "../../TxModal";
import "./flowerButton.scss";
import Modal from "../../CreateModal/createModal";
import RenameModal from "../../CreateModal/renameModal";
import TransferModal from "../../CreateModal/transferModal";
import AddModal from "../../CreateModal/addModal";
import BoostModal from "../../CreateModal/boostModal";
import { sleep } from "src/helpers";
import { emergancyClaim, startCompounding } from "src/store/slices/bloombox-thunk";

interface IFlowerButtonProps {
    action: string;
    usdcevalue: string;
    nctrValue: string;
    isNCTRApprved: boolean;
    isUsdceApproved: boolean;
    nodeId: number;
}

function FlowerButton({ action, usdcevalue, nctrValue, isNCTRApprved, isUsdceApproved, nodeId }: IFlowerButtonProps) {
    const [openModal, setOpenModal] = useState(false);
    const [openRenameModal, setRenameModal] = useState(false);
    const [openTransferModal, setTransferModal] = useState(false);
    const [openAddModal, setAddModal] = useState(false);
    const [openBoostModal, setBoostModal] = useState(false);
    const [openLockModal, setLockModal] = useState(false);
    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();
    const dispatch = useDispatch();

    let isBloomboxUSDCeApproved = isUsdceApproved;

    let isBloomboxNCTRApproved = isNCTRApprved;

    let strignId = nodeId.toString();

    let usdceBalance = usdcevalue;

    let NCTRBalance = nctrValue;

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleRenameModal = () => {
        //  setRenameModal(true);
    };

    const handleTransferModal = () => {
        setTransferModal(true);
    };

    const handleAddModal = () => {
        setAddModal(true);
    };

    const handleBoostModal = () => {
        //  setBoostModal(true);
    };

    let IdNode = nodeId.toString();

    const handleLockModal = async () => {
        if (action == "lock61") {
            let days = "518400";
            dispatch(startCompounding({ IdNode, days, provider, address, networkID: chainID }));
        } else if (action == "lock111") {
            let days = "1123200";
            dispatch(startCompounding({ IdNode, days, provider, address, networkID: chainID }));
        } else if (action == "lock171") {
            let days = "1728000";
            dispatch(startCompounding({ IdNode, days, provider, address, networkID: chainID }));
        } else if (action == "lock271") {
            let days = "2332800";
            dispatch(startCompounding({ IdNode, days, provider, address, networkID: chainID }));
        }
    };

    const handleClose = () => {
        setOpenModal(false);
    };
    const planetId = "1";
    const onCompoundReward = async () => {
        if (await checkWrongNetwork()) return;
        dispatch(compoundReward({ planetId, provider, address, networkID: chainID }));
    };
    const onClaimReward = async () => {
        if (await checkWrongNetwork()) return;
        // dispatch(emergancyClaim({ strignId, provider, address, networkID: chainID }));
    };

    let timerComponent;

    let buttonText = "";
    let className = "flower-button";
    let clickFunc = () => {};
    let filter = "";

    if (action == "compound") {
        buttonText = "Compound";
        timerComponent = <p>{buttonText}</p>;
        className = "flower-button";
        clickFunc = () => {
            onCompoundReward();
        };
    } else if (action == "claim") {
        buttonText = "Emergency Claim";
        className = "flower-button";
        clickFunc = () => {
            onClaimReward();
        };
    } else if (action == "rename") {
        buttonText = "Rename";
        className = "flower-button";
        clickFunc = () => {
            handleRenameModal();
        };
    } else if (action == "boost") {
        buttonText = "Boost";
        className = "flower-button";
        clickFunc = () => {
            handleBoostModal();
        };
    } else if (action == "add") {
        buttonText = "Add";
        className = "flower-button";
        clickFunc = () => {
            handleAddModal();
        };
    } else if (action == "transfer") {
        buttonText = "Transfer";
        className = "flower-button";
        clickFunc = () => {
            handleTransferModal();
        };
    } else if (action == "create") {
        buttonText = "Create New";
        className = "flower-button";
        clickFunc = () => {
            handleOpen();
        };
    } else if (action == "lock") {
        buttonText = "Lock";
        className = "flower-button";
    } else if (action == "lock61") {
        buttonText = "Start 6/1";
        className = "flower-button";
        clickFunc = () => {
            handleLockModal();
        };
    } else if (action == "lock111") {
        buttonText = "Lock 1(13/1)";
        className = "flower-button";
        clickFunc = () => {
            handleLockModal();
        };
    } else if (action == "lock171") {
        buttonText = "Lock 2(20/1)";
        className = "flower-button";
        clickFunc = () => {
            handleLockModal();
        };
    } else if (action == "lock271") {
        buttonText = "Lock 3(27/1)";
        className = "flower-button";
        clickFunc = () => {
            handleLockModal();
        };
    }

    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    if (pendingTransactions && pendingTransactions.length > 0) {
        buttonText = `${pendingTransactions.length} Tx Pending `;
        clickFunc = () => {};
    }

    return (
        <>
            {action == "create" ? (
                <ButtonToolbar className="button-toolbar1">
                    <Button className="buttonStyle1" color="primary" type="submit" onClick={clickFunc}>
                        {buttonText}
                    </Button>
                </ButtonToolbar>
            ) : (
                <ButtonToolbar className="button-toolbar">
                    <Button className="buttonStyle" color="primary" type="submit" onClick={clickFunc}>
                        {buttonText}
                    </Button>
                </ButtonToolbar>
            )}
            {/* <TxModal open={handleOpen} handleClose={handleClose} filter={filter} planetId={planetId} /> */}
            {openModal && <Modal closeModal={setOpenModal} isApproved={isBloomboxUSDCeApproved} usdceBalance={usdceBalance} />}
            {openRenameModal && <RenameModal closeModal={setRenameModal} />}
            {openTransferModal && <TransferModal closeModal={setTransferModal} idOfNode={nodeId} />}
            {openAddModal && <AddModal closeModal={setOpenModal} isApprovedNctr={isNCTRApprved} nctrBalance={NCTRBalance} idOfNode={nodeId} />}
            {openBoostModal && <BoostModal closeModal={setBoostModal} />}
        </>
    );
}
export default FlowerButton;
