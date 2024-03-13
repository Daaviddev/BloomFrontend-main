import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonToolbar } from "reactstrap";
import { useWeb3Context } from "../../../../hooks";
import { IReduxState } from "../../../../store/slices/state.interface";
import { IPendingTxn } from "../../../../store/slices/pending-txns-slice";
import "./bloomButton.scss";
import { IAppSlice } from "src/store/slices/app-slice";
import { IAccountSlice, IBloomifyInfo } from "src/store/slices/account-slice";
import { bloomifyClaim, bloomifyCompound, approveBloomify } from "src/store/slices/bloomify-thunk";
import { CircularProgress } from "@material-ui/core";

interface IBloomButtonProps {
    action: string;
    actionTime: number;
}

function BloomButton({ action, actionTime }: IBloomButtonProps) {
    const [open, setOpen] = useState(false);
    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();
    const isAccountLoading = useSelector<IReduxState, boolean>(state => state.account.loading);
    const userInfo = useSelector<IReduxState, IBloomifyInfo>(state => state.account.bloomifyUserInfo);
    let value = "0";
    const dispatch = useDispatch();

    if (userInfo != undefined) {
        value = userInfo.dailyClaimAmount;
    }

    const calculateTimeLeft = () => {
        const timeLeftStamp = actionTime - Math.floor(Date.now() / 1000);
        //   console.log("tileLeft", timeLeftStamp);
        if (timeLeftStamp <= 0) return 0;

        return timeLeftStamp;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    // console.log("buton action time", actionTime);

    useEffect(() => {
        let timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    });

    let buttonText = "";
    let className = "bloom-button";
    let clickFunc = () => {};
    let filter = "";

    const handleClaim = async () => {
        if (await checkWrongNetwork()) {
            return;
        } else {
            if (isAccountLoading) {
                dispatch(bloomifyClaim({ provider, address, networkID: chainID }));
            }
        }
    };

    const handlePllinate = async () => {
        if (await checkWrongNetwork()) {
            return;
        } else {
            if (isAccountLoading) {
                dispatch(bloomifyCompound({ value, provider, address, networkID: chainID }));
            }
        }
    };

    const handleApprove = async () => {
        if (await checkWrongNetwork()) {
            return;
        } else {
            dispatch(approveBloomify({ provider, address, networkID: chainID }));
        }
    };

    let timerComponent;

    if (action == "compound") {
        buttonText = timeLeft == 0 ? "Pollinate" : new Date(timeLeft * 1000).toISOString().substring(11, 19);
        timerComponent = <p>{buttonText}</p>;
        className = "bloom-button";
        clickFunc = () => {
            handlePllinate();
        };
    } else if (action == "claim") {
        buttonText = timeLeft == 0 ? "Claim" : new Date(timeLeft * 1000).toISOString().substring(11, 19);
        timerComponent = <p>{buttonText}</p>;
        className = "bloom-button";
        clickFunc = () => {
            handleClaim();
        };
    } else if (action == "check") {
        buttonText = "Check";
        className = "bloom-button";
    } else if (action == "deposit") {
        buttonText = "Deposit";
        className = "bloom-button";
    } else if (action == "upgrade") {
        buttonText = "Upgrade";
        className = "bloom-button";
    } else if (action == "mint") {
        buttonText = "mint";
        className = "bloom-button";
    } else if (action == "approve") {
        buttonText = "Approve";
        className = "bloom-button";
        clickFunc = () => {
            handleApprove();
        };
    } else if (action == "manage") {
        buttonText = "Manage Team";
        className = "bloom-button";
    } else if (action == "setWallet") {
        buttonText = "Set My Wallet";
        className = "bloom-button";
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
            <ButtonToolbar className="button-toolbar">
                <Button className="buttonStyle" color="primary" type="submit" onClick={clickFunc}>
                    <p>{buttonText}</p>
                    {pendingTransactions.length > 0 && (
                        <div className="planet-button-progress">
                            <CircularProgress size={15} color="inherit" />
                        </div>
                    )}
                </Button>
            </ButtonToolbar>
        </>
    );
}
export default BloomButton;
function bloomifyApprove(arg0: { provider: import("@ethersproject/providers").JsonRpcProvider; address: string; networkID: number }): any {
    throw new Error("Function not implemented.");
}
