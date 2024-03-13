import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { Button, ButtonToolbar } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { sleep, trim } from "src/helpers";
import { useWeb3Context } from "src/hooks";
import { IsUsdceApproved, swapExactTokensForTokens, approveBloomexUSDCe } from "../../../store/slices/bloomex-thunk";

const BuyBTC = ({ NCTRBalance, USDCeBalance, nctrPrice, USDCePrice }) => {
    const [amountIn, setamountIn] = useState("");
    const [nctrToget, setnctrToget] = useState(0);

    const maxClickEvent = () => {
        setamountIn(Number(USDCeBalance));
        let nctt = Number(USDCeBalance) / Number(nctrPrice);
        let ncct1 = trim(nctt / Math.pow(10, 8), 2);
        setnctrToget(ncct1);
        return "";
    };

    const nctrSwap = false;

    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();

    let nctrPerUsdce = Number(1) / Number(nctrPrice);
    let nctrPerUsdce1 = trim(nctrPerUsdce / Math.pow(10, 8), 2);

    const handleChangeValue = value => {
        setamountIn(value);
        let nctt = Number(value) / Number(nctrPrice);
        let ncct1 = trim(nctt / Math.pow(10, 8), 2);
        setnctrToget(ncct1);
        return "";
    };
    const dispatch = useDispatch();

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
            dispatch(approveBloomexUSDCe({ provider, address, networkID: chainID }));
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
                <h5 className="bold-text1 textheight">BUY $NCTR</h5>
            </div>
            <div className="formContainer">
                <div className="form form--horizontal">
                    <div className="form__form-group12">
                        <div className="valuesPad">
                            <span className="form__form-group-label subhead">$USDC.e</span>
                            <span className="form__form-group-label subhead">Balance: {USDCeBalance} $USDC.e</span>
                        </div>
                        <div className="form__form-group-field1">
                            <input
                                name="price"
                                type="number"
                                placeholder="$USDC.e"
                                value={amountIn}
                                className="input12"
                                onChange={value => handleChangeValue(value.target.value ? value.target.value : "")}
                            />
                            <input className="getDownlineWallet12" type="" value="Max" onClick={maxClickEvent} readOnly />
                        </div>
                    </div>
                    <div className="form__form-group">
                        <div className="valuesPad">
                            <span className="form__form-group-label subhead">$NCTR</span>
                            <span className="form__form-group-label subhead">Balance: {NCTRBalance} $NCTR</span>
                        </div>
                        <div className="form__form-group-field">
                            <input name="amount" type="number" placeholder="$NCTR" value={nctrToget} className="input12 makeRadius" readOnly />
                        </div>
                    </div>
                    <div>
                        <h5 className="dashboard__place-order-form-subhead subhead">1 $USDC.e = ~{nctrPerUsdce1} $NCTR</h5>
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
                            Approve USDC.e
                        </Button>
                    </ButtonToolbar>
                </div>
            </div>
        </div>
    );
};

BuyBTC.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    balance: PropTypes.string,
    nctrprice: PropTypes.string,
};

export default BuyBTC;
