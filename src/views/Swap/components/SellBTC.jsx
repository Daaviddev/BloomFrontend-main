import PropTypes from "prop-types";
import { Button, ButtonToolbar } from "reactstrap";
import React, { useEffect, useState } from "react";
import { useWeb3Context } from "src/hooks";
import { swapExactTokensForTokens, approveBloomexNCTR } from "../../../store/slices/bloomex-thunk";
import { useDispatch, useSelector } from "react-redux";
import { sleep, trim } from "src/helpers";

const SellBTC = ({ onSubmit, NCTRBalance, USDCeBalance, nctrPrice, USDCePrice }) => {
    const [amountIn, setamountIn] = useState("");
    const [nctrToget, setnctrToget] = useState(0);
    const maxClickEvent = () => {
        setamountIn(trim(Number(NCTRBalance), 2));
        let nctt = NCTRBalance * nctrPrice;
        let ncct1 = trim(nctt * Math.pow(10, 8), 2);
        setnctrToget(ncct1);
    };

    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();

    const handleChangeValue = value => {
        setamountIn(value);
        let nctt = value * nctrPrice;
        let ncct1 = trim(nctt * Math.pow(10, 8), 2);
        setnctrToget(ncct1);
        return "";
    };

    let nctr1 = 1 * nctrPrice;
    let nctr2 = trim(nctr1 * Math.pow(10, 8), 2);

    const dispatch = useDispatch();

    const nctrSwap = true;

    const handleClick = async () => {
        if (await checkWrongNetwork()) {
            return;
        } else {
            dispatch(swapExactTokensForTokens({ nctrSwap, amountIn, provider, address, networkID: chainID }));
        }
    };

    const handleApprove = async () => {
        if (await checkWrongNetwork()) {
            return;
        } else {
            dispatch(approveBloomexNCTR({ provider, address, networkID: chainID }));
        }
    };

    let actionTime = 0;

    const getActionTime = () => {
        actionTime = Math.floor(Date.now() / 1000);
        return actionTime <= 0 ? 0 : actionTime;
    };

    const getTimeLeft = () => {
        const timestamp = Math.floor(Date.now() / 1000);
        return timestamp <= 0 ? 0 : timestamp;
    };

    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    useEffect(() => {
        let timer = setInterval(() => {
            setTimeLeft(getActionTime());
        }, 1000);
        return () => clearInterval(timer);
    });

    return (
        <div className="freshBoard">
            <div className="setThis">
                <h5 className="bold-text1 textheight">SELL $NCTR</h5>
            </div>
            <div onSubmit={onSubmit} className="formContainer">
                <div className="form form--horizontal">
                    <div className="form__form-group12">
                        <div className="valuesPad">
                            <span className="form__form-group-label subhead">$NCTR</span>
                            <span className="form__form-group-label subhead">Balance:{NCTRBalance} $NCTR</span>
                        </div>
                        <div className="form__form-group-field1">
                            <input
                                name="price"
                                type="number"
                                placeholder="$NCTR"
                                value={amountIn}
                                className="input12"
                                onChange={value => handleChangeValue(value.target.value ? value.target.value : "")}
                            />
                            <input className="getDownlineWallet12" type="submit" value="Max" onClick={maxClickEvent} readOnly />
                        </div>
                    </div>
                    <div className="form__form-group">
                        <div className="valuesPad">
                            <span className="form__form-group-label subhead">$USDC.e</span>
                            <span className="form__form-group-label subhead">Balance: {USDCeBalance} $USDC.e</span>
                        </div>
                        <div className="form__form-group-field">
                            <input name="amount" type="number" placeholder="$USDC.e" value={nctrToget} className="input12 makeRadius" readOnly />
                        </div>
                    </div>
                    <div>
                        <h5 className="dashboard__place-order-form-subhead subhead">1 $NCTR = {nctr2} ~ $USDC.e</h5>
                    </div>
                    <ButtonToolbar className="form__button-toolbar12">
                        <Button
                            color="primary"
                            type="submit"
                            className="swapButton"
                            onClick={async () => {
                                await handleClick();
                                await sleep(10);
                            }}
                        >
                            SWAP
                        </Button>
                        <Button
                            color="primary"
                            type="submit"
                            className="swapButton"
                            onClick={async () => {
                                await handleApprove();
                                await sleep(10);
                            }}
                        >
                            Approve NCTR
                        </Button>
                    </ButtonToolbar>
                </div>
            </div>
        </div>
    );
};

SellBTC.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default SellBTC;
