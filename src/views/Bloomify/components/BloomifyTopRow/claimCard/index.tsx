import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardBody, Col } from "reactstrap";
import "../../../../TeamManagement/teamManagement.scss";
import { Skeleton } from "@material-ui/lab";
import "../../../bloomify.scss";
import BloomButton from "../../bloomButton";
import { useDispatch, useSelector } from "react-redux";
import { IReduxState } from "../../../../../store/slices/state.interface";
import { IAppSlice } from "../../../../../store/slices/app-slice";
import { IAccountSlice, IBloomBoxInfo, IBloomifyInfo } from "../../../../../store/slices/account-slice";
import { bloomifyClaim, bloomifyCompound } from "../../../../../store/slices/bloomify-thunk";
import { useWeb3Context } from "src/hooks";
import { trim } from "src/helpers";

const ClaimCard = () => {
    const app = useSelector<IReduxState, IAppSlice>(state => state.app);
    let nctrPrice = "0";
    const userInfo = useSelector<IReduxState, IBloomifyInfo>(state => state.account.bloomifyUserInfo);

    let pendingDolara = "0";

    let nextTime = 0;

    let valuue = "0";
    let pendingReward = "0";
    let pendingRewardDolard = "0";
    if (userInfo != undefined) {
        valuue = userInfo.dailyClaimAmount;
        let nctrnumber = trim(Number(app.nctrPrice) * Math.pow(10, 8), 2);
        nctrPrice = nctrnumber.toString();
        pendingDolara = trim(Number(valuue) * Number(nctrnumber), 2);
        nextTime = Number(userInfo.nextActionTime);

        pendingReward = userInfo.pendingReward;
        pendingRewardDolard = trim(Number(pendingReward) * Number(nctrnumber), 2);
    }

    const getActionTime = () => {
        const actionTime = nextTime;
        return actionTime <= 0 ? 0 : actionTime;
    };

    const cutNumber = (number: number, digitsAfterDot: number) => {
        const str = `${number}`;

        return str.slice(0, str.indexOf(".") + digitsAfterDot + 1);
    };

    const getTimeLeft = () => {
        const timestamp = getActionTime() - Math.floor(Date.now() / 1000);
        return timestamp <= 0 ? 0 : timestamp;
    };

    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    const id = 1;

    useEffect(() => {
        let timer = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    });

    return (
        <Col className="teammanagementCol33 addMargins colheight" md={12} xl={3} lg={6} xs={12}>
            <Card className="teamCard1 cardheight">
                <CardBody className="infoCardBody cardBody3">
                    <div className="contentWrapper">
                        <div className="headerWrapper">
                            <span className="headerText">AVAILABLE</span>
                        </div>
                        <div className="subheadContainer">
                            <span className="subheadText">1 $NCTR = {nctrPrice} USDC.e</span>
                        </div>
                        <div className="valueWrapper">
                            <div className="availableRewardContainer">
                                <p className="dollarAvailable">${pendingRewardDolard}</p>
                                <p className="headerText">Pending Reward: {pendingReward} $NCTR</p>
                            </div>
                        </div>
                        <div className="valueWrapper">
                            <div className="availableRewardContainer">
                                <p className="dollarAvailable">${pendingDolara}</p>
                                <p className="headerText">Daily Reward: {valuue} $NCTR</p>
                            </div>
                        </div>
                        <div className="buttonWrapper">
                            {" "}
                            <div className="buttonContainer">
                                <BloomButton action="claim" actionTime={getActionTime()} />
                            </div>
                            <div className="buttonContainer">
                                <BloomButton action="compound" actionTime={getActionTime()} />
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default ClaimCard;
