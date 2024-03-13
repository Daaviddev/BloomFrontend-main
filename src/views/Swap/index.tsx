import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row } from "reactstrap";
import { trim } from "src/helpers";
import { IReduxState } from "src/store/slices/state.interface";
import BCH from "./components/BCH";
import BTC from "./components/BTC";
import ETH from "./components/ETH";
import PlaceOrder from "./components/PlaceOrder";
import XRP from "./components/XRP";

export interface ITop10Data {
    id: number;
    name: string;
    teamMemebers: number;
    airdropsSent: number;
}

function Swap() {
    let accountBalanceusdce = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.usdce;
    });

    const accountBalancenctr = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.nctr;
    });

    const isBloomifyApproved = useSelector<IReduxState, boolean>(state => {
        return state.account.approvals && state.account.approvals.isBloomifyApproved;
    });

    const getNCTRprice = useSelector<IReduxState, number>(state => {
        return state.app && state.app.nctrPrice;
    });

    const getUSDCeprice = useSelector<IReduxState, number>(state => {
        return state.app && state.app.usdcePrice;
    });

    let usdceBalance = "0";

    let actionTime = 0;

    const getActionTime = () => {
        actionTime = Math.floor(Date.now() / 1000);
        return actionTime <= 0 ? 0 : actionTime;
    };

    const getTimeLeft = () => {
        const timestamp = Math.floor(Date.now() / 1000);
        accountBalanceusdce = useSelector<IReduxState, string>(state => {
            return state.account.balances && state.account.balances.usdce;
        });

        return timestamp <= 0 ? 0 : timestamp;
    };

    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    useEffect(() => {
        let timer = setInterval(() => {
            setTimeLeft(getActionTime());
        }, 1000);
        return () => clearInterval(timer);
    });

    if (accountBalanceusdce != null) {
        usdceBalance = accountBalanceusdce.toString();
    }
    return (
        <>
            <div className="newAgeSwap">
                <div className="setThis1  is-sticky">
                    <p className="bold-text1 textheight1"> BLOOMEX</p>
                </div>

                <Container className="teamContainer2">
                    {/* <Row className="teamRow teamBox">
                        {/* <BTC></BTC>
                        <ETH></ETH>
                        <XRP></XRP>
                        <BCH></BCH> */}
                    {/* </Row> */}
                    <Row className="teamRow teamBox">
                        <PlaceOrder NCTRBalance={trim(Number(accountBalancenctr), 2)} USDCeBalance={usdceBalance} nctrPrice={getNCTRprice} USDCePrice={getUSDCeprice}></PlaceOrder>
                    </Row>
                    <Row className="teamRow teamBox"></Row>
                </Container>
            </div>
        </>
    );
}

export default Swap;
