import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppBar, Toolbar, SvgIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import plain from "../../../assets/flowers/1.png";
import glade from "../../../assets/flowers/2.png";
import camp from "../../../assets/flowers/3.png";
import lumberjack from "../../../assets/flowers/4.png";
import valley from "../../../assets/flowers/5.png";
import settlement from "../../../assets/flowers/6.png";
import FlowerButton from "../ToolBar/flowerButton";
import { trim } from "../../../helpers";
import { IReduxState } from "../../../store/slices/state.interface";
import { IAccountSlice, IBloomBoxInfo, IFlowerInfoDetails } from "../../../store/slices/account-slice";
import { BorderAll } from "@material-ui/icons";
import { Col, Container, Row, Card, CardBody } from "reactstrap";
import "./flowerCard.scss";
import BloomBox from "..";
import { IAppSlice } from "src/store/slices/app-slice";
import { months } from "moment";

interface IBloomBoxCard {
    bloombox: IBloomBoxInfo;
    NCTRBalance: number;
}

function FlowerCard({ bloombox, NCTRBalance }: IBloomBoxCard) {
    const app = useSelector<IReduxState, IAppSlice>(state => state.app);
    const usdcePrice = useSelector<IReduxState, number>(state => state.app.usdcePrice);
    const nctrPrice = useSelector<IReduxState, number>(state => state.app.nctrPrice);

    const [dailyAPR, setDailyAPR] = useState<number>(bloombox.rewardMult / 100000);

    const [lockedUntilUnix, setLockedUntilUnix] = useState<number>(bloombox.lockedUntil);

    const [autoClaimUnix, setautoClaimUnix] = useState<number>(bloombox.lockedUntil);

    const getTierLevel = (reward: number) => {
        const amount = reward - 100000;
        if (amount === 0) return 0;
        else if (amount <= 50000) return 1;
        else if (amount <= 65000) return 2;
        else if (amount <= 75000) return 3;
        else if (amount <= 80000) return 4;
        else if (amount <= 90000) return 5;
        else if (amount < 100000) return 6;
        else if (amount < 110000) return 7;
        else if (amount < 120000) return 8;
        else if (amount < 130000) return 9;
        else if (amount < 140000) return 10;
        else return 0;
    };
    const [tierLevel, setTierLevel] = useState<number>(getTierLevel(bloombox.rewardMult));

    const accountBalancenctr = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.nctr;
    });

    const accont = useSelector<IReduxState, IAccountSlice>(state => {
        return state.account;
    });

    console.log(bloombox.bloomValue);

    let bloomboxValue = trim(Number(bloombox.bloomValue) / Math.pow(10, 18), 2);

    let valuues = trim(Number(bloombox.pendingReward), 2);

    let pendingValue = trim(Number(valuues) / Math.pow(10, 18), 2);

    let nctrPrice1 = trim(Number(app.nctrPrice) * Math.pow(10, 8), 2);

    let pendingValueUsce = trim(Number(pendingValue) * Number(nctrPrice1), 2);

    const getBonus = (reward: number) => {
        return (reward - 100000) / 1000;
    };

    const getActionTime = () => {
        const actionTime = bloombox.lastProcessingTimestamp + bloombox.compoundDelay * 6 * 100000;
        // return actionTime == 0 ? "0" : new Date(actionTime * 1000).toISOString().substring(11, 19);

        return actionTime <= 0 ? 0 : actionTime;
    };
    let timers = getActionTime();

    const calculateTimeLeft = () => {
        const timeLeftStamp = timers - Math.floor(Date.now() / 1000);

        if (timeLeftStamp <= 0) return 0;
        return timeLeftStamp;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    let timerComponent = calculateTimeLeft();

    let time = new Date(timerComponent * 1000).toISOString().substring(11, 19);

    let lockedUntil = new Date(lockedUntilUnix * 1000);

    let yearLockd = lockedUntil.getFullYear();

    let getMonthLocked = lockedUntil.getMonth();

    let getDayLocked = lockedUntil.getDate();

    let numb = bloombox.lockedUntil - bloombox.lockPeriod;

    const current = new Date(numb * 1000);

    let addZero = "";

    let addZero1 = "";

    if (getMonthLocked < 11) {
        addZero = "0";
    }

    if (getDayLocked < 11) {
        addZero1 = "0";
    }

    let old = current.getDate();

    if (old > getDayLocked) {
        getMonthLocked = getMonthLocked + 1;
    }

    let lockedUntil1 = addZero + getMonthLocked + "-" + addZero1 + getDayLocked + "-" + yearLockd;

    let autoClaim = new Date(autoClaimUnix * 1000);

    let yearClaim = autoClaim.getFullYear();
    let monthClaim = autoClaim.getMonth();

    let dayClaim = autoClaim.getDate();

    let addZeros = "";

    let addZeros1 = "";

    if (monthClaim < 11) {
        addZeros = "0";
    }

    if (dayClaim < 11) {
        addZeros1 = "0";
    }

    if (old > dayClaim) {
        monthClaim = monthClaim + 1;
    }

    let autoClaim1 = addZeros + monthClaim + "-" + addZeros1 + dayClaim + "-" + yearClaim;

    useEffect(() => {
        let timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    });

    let valuue = bloombox.bloomValue.toString();
    let nctrnumber = trim(Number(app.nctrPrice) * 100000000, 2);
    let lockedDolara = trim((Number(valuue) * Number(nctrnumber)) / Math.pow(10, 18), 2);

    let classa = "teamCard33 burMe";

    if (bloombox.lockPeriod > 0) {
        classa = "teamCard33";
    } else {
        classa = " teamCard33 blurMe";
    }

    const className = timeLeft == 0 ? "dapp-topbar-btns-wrap" : "dapp-topbar-btns-wrap-full";

    return (
        <>
            <Col className="teammanagementCol3 colHelp addBackground" md={12} xl={3} lg={6} xs={12}>
                <Card className="teamCard33 teamCard33Help">
                    <CardBody className="dashboard__card-widget addBackground ">
                        <div className="card__title2">
                            <div className="flexAgain1">
                                <div className="colorThis">
                                    <p className="bold-text">Name: {bloombox.name}</p>
                                </div>
                                <div className="colorThis">
                                    <p className="bold-text">ID: #{bloombox.id}</p>
                                </div>
                                <div className="colorThis">
                                    <p className="bold-text">Tier:{tierLevel} </p>
                                </div>
                            </div>
                        </div>
                        <div className="flowerButtonWrapper">
                            <div className="flowerButtonContainer">
                                <FlowerButton action="transfer" usdcevalue={"1"} nctrValue={"1"} isNCTRApprved={false} isUsdceApproved={false} nodeId={bloombox.id} />
                            </div>
                            <div className="flowerButtonContainer">
                                <FlowerButton action="rename" usdcevalue={"1"} nctrValue={"1"} isNCTRApprved={false} isUsdceApproved={false} nodeId={bloombox.id} />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col className="teammanagementCol3 colHelp" md={12} xl={3} lg={6} xs={12}>
                <Card className="teamCard33 bottomedMargin">
                    <CardBody className="dashboard__card-widget">
                        <div className="card__title33">
                            <h5 className="bold-text2">Info</h5>
                        </div>
                        <div className="textContainer1">
                            <div className="smallCont">
                                <div className="textContainer123 ">
                                    <p className="smallText3">VALUE :</p>
                                </div>
                            </div>
                            <div className="bigCont">
                                {" "}
                                <div className="textContainer123 bottomedMargin">
                                    <p className="bigText">{bloomboxValue} $NCTR </p>
                                    <p className="smallText">/ {lockedDolara} $USDC.e </p>
                                </div>
                                <div className="textContainer123">
                                    <p className="smallText1">COMPOUNDS :</p>
                                    <p className="smallText">{bloombox.timesCompounded}</p>
                                </div>
                                <div className="textContainer123">
                                    <p className="smallText1">DAILY APR :</p>
                                    <p className="smallText"> {dailyAPR}%</p>
                                </div>
                                <div className="textContainer123">
                                    <p className="smallText1">CLAIMED :</p>
                                    <p className="smallText">{bloombox.totalClaimed}</p>
                                </div>
                            </div>
                        </div>{" "}
                        <div className="flowerButtonWrapper">
                            <div className="flowerButtonContainer">
                                <FlowerButton
                                    action="add"
                                    usdcevalue={"1"}
                                    nctrValue={trim(Number(NCTRBalance), 2)}
                                    isNCTRApprved={false}
                                    isUsdceApproved={false}
                                    nodeId={bloombox.id}
                                />
                            </div>
                            <div className="flowerButtonContainer">
                                <FlowerButton action="boost" usdcevalue={"1"} nctrValue={"1"} isNCTRApprved={false} isUsdceApproved={false} nodeId={bloombox.id} />
                            </div>
                        </div>
                    </CardBody>
                </Card>
                {bloombox.lockPeriod > 0 ? (
                    <Card className={classa}>
                        <CardBody className="dashboard__card-widget">
                            <div className="card__title33">
                                <h5 className="bold-text2">Stats</h5>
                            </div>
                            <div className="textContainer1">
                                <div className="smallCont">
                                    <div className="textContainer123">
                                        <p className="smallText3">PENDING :</p>
                                    </div>
                                </div>
                                <div className="bigCont">
                                    <div className="textContainer123 bottomedMargin">
                                        <p className="bigText">{pendingValue} $NCTR </p>
                                        <p className="smallText">/ {pendingValueUsce} $USDC.e </p>
                                    </div>
                                    <div className="textContainer123">
                                        <p className="smallText1">LOCKED UNTIL :</p>
                                        <p className="smallText">{lockedUntil1}</p>
                                    </div>
                                    <div className="textContainer123">
                                        <p className="smallText1">AUTO-CLAIM :</p>
                                        <p className="smallText">{autoClaim1}</p>
                                    </div>
                                    <div className="textContainer123">
                                        <p className="smallText1">AUTO-COMPOUND :</p>
                                        <p className="smallText">{time}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flowerButtonWrapper">
                                {" "}
                                <div className="flowerButtonContainer">
                                    <FlowerButton action="lock" usdcevalue={"1"} nctrValue={"1"} isNCTRApprved={false} isUsdceApproved={false} nodeId={bloombox.id} />
                                </div>
                                <div className="flowerButtonContainer">
                                    <FlowerButton action="claim" usdcevalue={"1"} nctrValue={"1"} isNCTRApprved={false} isUsdceApproved={false} nodeId={bloombox.id} />
                                </div>{" "}
                            </div>
                        </CardBody>
                    </Card>
                ) : (
                    <Card className="teamCard33">
                        <CardBody className="dashboard__card-widget1 ">
                            {" "}
                            <div className="card__title33">
                                <h5 className="bold-text2">UNLOCK BLOOMBOX</h5>
                            </div>{" "}
                            <div className="flowerButtonWrapper">
                                {" "}
                                <div className="flowerButtonContainer">
                                    <FlowerButton action="lock61" usdcevalue={"1"} nctrValue={"1"} isNCTRApprved={false} isUsdceApproved={false} nodeId={bloombox.id} />
                                </div>
                                <div className="flowerButtonContainer">
                                    <FlowerButton action="lock111" usdcevalue={"1"} nctrValue={"1"} isNCTRApprved={false} isUsdceApproved={false} nodeId={bloombox.id} />
                                </div>{" "}
                                <div className="flowerButtonContainer">
                                    <FlowerButton action="lock171" usdcevalue={"1"} nctrValue={"1"} isNCTRApprved={false} isUsdceApproved={false} nodeId={bloombox.id} />
                                </div>{" "}
                            </div>
                        </CardBody>
                    </Card>
                )}
            </Col>
        </>
    );
}

export default FlowerCard;
