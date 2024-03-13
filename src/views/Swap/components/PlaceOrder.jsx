import Panel from "../../shared/components/Panel";
import React, { useEffect, useState } from "react";
import showResults from "../../shared/utils/showResults";
import BuyBTC from "./BuyBTC";
import SellBTC from "./SellBTC";
import "./components.scss";

const PlaceOrder = ({ NCTRBalance, USDCeBalance, nctrPrice, USDCePrice }) => {
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
        <Panel xl={6} lg={12} title="">
            <div className="dashboard__place-order">
                <BuyBTC NCTRBalance={NCTRBalance} USDCeBalance={USDCeBalance} nctrPrice={nctrPrice} USDCePrice={USDCePrice} />
                <div className="destroy"></div>
                <SellBTC NCTRBalance={NCTRBalance} USDCeBalance={USDCeBalance} nctrPrice={nctrPrice} USDCePrice={USDCePrice} />
            </div>
        </Panel>
    );
};

export default PlaceOrder;
