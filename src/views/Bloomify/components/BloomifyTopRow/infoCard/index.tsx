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
import { IAccountSlice, IBloomifyInfo } from "../../../../../store/slices/account-slice";
import { GrMoney, GrDeploy } from "react-icons/gr";
import { FaPercentage } from "react-icons/fa";
import { GiMoneyStack, GiCoins, GiReturnArrow, GiTeamIdea } from "react-icons/gi";
import { RiPercentLine } from "react-icons/ri";
import { SiAutoprefixer } from "react-icons/si";
import CreatableSelect from "react-select/creatable";
import { useWeb3Context } from "src/hooks";
import { fixAPRBloomify } from "src/store/slices/bloomify-thunk";
import ClaimCard from "../claimCard";
import DepositCard from "../depositCard";
import CheckCard from "../checkCard";
import { trim } from "src/helpers";

const InfoCard = () => {
    const userInfo = useSelector<IReduxState, IBloomifyInfo>(state => state.account.bloomifyUserInfo);
    const app = useSelector<IReduxState, IAppSlice>(state => state.app);

    let depositedValue = "0";
    let NDV = "false";
    let referralRewards = "0";
    let maxPayout = 0;
    let claimed = "0";
    let team = "0";
    let count = "0";
    let teamLeader = "0x";
    let dollarValue = "0";

    if (userInfo != undefined) {
        NDV = userInfo.isNetPositive.toString();
        depositedValue = userInfo.totalDeposit;
        let maxPayout1 = Number(depositedValue) * 3.65;
        maxPayout = Number(trim(maxPayout1, 2));
        let nctrnumber = trim(Number(app.nctrPrice) * Math.pow(10, 8), 2);
        claimed = userInfo.payouts;
        team = userInfo.userDownilnesCount;
        dollarValue = trim(Number(depositedValue) * Number(nctrnumber), 2);
        teamLeader = userInfo.upline;
        if (Number(userInfo.APR) == 10) {
            referralRewards = "1%";
        } else {
            referralRewards = "0.5%";
        }
    }

    const getActionTime = () => {
        const actionTime = 1;
        return actionTime <= 0 ? 0 : actionTime;
    };

    const getTimeLeft = () => {
        const timestamp = getActionTime() - Math.floor(Date.now() / 1000);
        return timestamp <= 0 ? 0 : timestamp;
    };

    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();
    const dispatch = useDispatch();

    const handleFixAPR = async () => {
        if (await checkWrongNetwork()) {
            return;
        } else {
            if (teamLeader != "0x") {
                let wallet = teamLeader;
                dispatch(fixAPRBloomify({ wallet, provider, address, networkID: chainID }));
            }
        }
    };

    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    useEffect(() => {
        let timer = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    });

    return (
        <>
            <Col className="teammanagementColManage1" md={12} xl={4} lg={5} xs={12}>
                <Card className="teamCard11">
                    {" "}
                    <CardBody className="infoCardBody1 cardBody3">
                        <div className="contentWrapper33">
                            <div className="tableWrapper1">
                                <div className="boxesBloomify">
                                    <div className="rowWrapperBox tihsis">
                                        {" "}
                                        <GiCoins className="iconBloomify" />
                                        <p className="subheadText">Deposited</p>
                                        <p className="subheadText">
                                            {depositedValue} $NCTR [${dollarValue}]
                                        </p>
                                    </div>
                                    <div className="rowWrapperBox tihsis">
                                        <GiReturnArrow className="iconBloomify" color="white" />
                                        <p className="subheadText">Positive Deposit Value </p>
                                        <p className="subheadText">{NDV}</p>
                                    </div>{" "}
                                    <div className="rowWrapperBox tihsis">
                                        <RiPercentLine className="iconBloomify" />
                                        <p className="subheadText">Daily APR</p>
                                        <p className="subheadText">{referralRewards}</p>
                                    </div>
                                </div>
                                <div className="boxesBloomify">
                                    {" "}
                                    <div className="rowWrapperBox tihsis">
                                        <SiAutoprefixer className="iconBloomify" color="white" />
                                        <p className="subheadText"> Max Payout </p>
                                        <div>
                                            <p className="subheadText">{maxPayout} $NCTR</p>
                                        </div>
                                    </div>
                                    <div className="rowWrapperBox tihsis">
                                        <SiAutoprefixer className="iconBloomify" color="white" />
                                        <p className="subheadText">Claimed </p>
                                        <p className="subheadText">{claimed} $NCTR</p>
                                    </div>
                                    <div className="rowWrapperBox tihsis">
                                        <GiTeamIdea className="iconBloomify" color="white" />
                                        <p className="subheadText">Downline Count </p>
                                        <p className="subheadText">{team} </p>
                                    </div>
                                </div>{" "}
                            </div>
                            {/* <div className="buttonWrapper">
                                <div className="buttonContainerNew">
                                    <input className="getDownlineWallet dvs doubleButton" type="submit" value="Fix APR" onClick={handleFixAPR} />
                                </div>
                            </div> */}
                        </div>
                    </CardBody>{" "}
                    <div className="classaDa">
                        <ClaimCard />
                        <DepositCard />
                        <CheckCard />
                    </div>
                </Card>{" "}
            </Col>
        </>
    );
};

export default InfoCard;
