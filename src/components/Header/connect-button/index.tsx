import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3Context } from "../../../hooks";
import { DEFAULD_NETWORK } from "../../../constants";
import { IReduxState } from "../../../store/slices/state.interface";
import { IPendingTxn } from "../../../store/slices/pending-txns-slice";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../button-styles.scss";

function ConnectButton() {
    const { connect, disconnect, connected, web3, providerChainID, checkWrongNetwork } = useWeb3Context();
    const dispatch = useDispatch();
    const [isConnected, setConnected] = useState(connected);

    let pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    let buttonText = "Connect";
    let clickFunc: any = connect;
    let buttonStyle = {};

    if (isConnected) {
        buttonText = "Disconnect";
        clickFunc = disconnect;
    }

    if (pendingTransactions && pendingTransactions.length > 0) {
        buttonText = `${pendingTransactions.length} Pending `;
        clickFunc = () => {};
    }

    if (isConnected && providerChainID !== DEFAULD_NETWORK) {
        buttonText = "Wrong network";
        buttonStyle = { backgroundColor: "rgb(255, 67, 67)" };
        clickFunc = () => {
            checkWrongNetwork();
        };
    }

    useEffect(() => {
        setConnected(connected);
    }, [web3, connected]);

    return (
        <div className="buttonWrapperStyle">
            <div className="">
                <div className="headButtonStyle" style={buttonStyle} onClick={clickFunc}>
                    {buttonText}
                    {pendingTransactions.length > 0 && (
                        <div className="connect-button-progress">
                            <CircularProgress size={15} color="inherit" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ConnectButton;
