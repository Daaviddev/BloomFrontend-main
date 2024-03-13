import { useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
import "../../../../TeamManagement/teamManagement.scss";
import "../../../../Bloomify/bloomify.scss";
import { useWeb3Context } from "src/hooks";
import { bloomifyCheckPlayer, IBloomifyPlayer } from "src/store/slices/bloomify-thunk";
import { sleep } from "src/helpers";
import { useSelector } from "react-redux";
import { IReduxState } from "src/store/slices/state.interface";
import { IAppSlice } from "src/store/slices/app-slice";
import { IAccountSlice } from "src/store/slices/account-slice";
import { Skeleton } from "@material-ui/lab";
import FlowerButton from "src/views/BloomBox/ToolBar/flowerButton";

const TotalCard = () => {
    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();
    const [wallet, setWallet] = useState<string>("");
    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const app = useSelector<IReduxState, IAppSlice>(state => state.app);

    const isAccountLoading = useSelector<IReduxState, boolean>(state => state.account.loading);
    const account = useSelector<IReduxState, IAccountSlice>(state => state.account);

    let usdcePrice = 0;
    let totalSupply = 0;
    let totalFlowers = 0;
    let nctrPrice = 0;
    let totalValueLocked = 0;
    let burnedFromRenaming = 0;
    let calculateTotalDailyEmission = 0;
    let creationMinPrice = "";
    let networkID = 0;
    let lockedUsdce = 0;
    let lockedUsdce1 = 0;

    if (app != undefined) {
        usdcePrice = app.usdcePrice;
        totalSupply = app.totalSupply;
        totalFlowers = app.totalFlowers;
        nctrPrice = app.nctrPrice;
        totalValueLocked = app.totalValueLocked;
        nctrPrice = app.nctrPrice;
        let pendingDolarr = totalValueLocked * nctrPrice;
        let pennding = pendingDolarr * Math.pow(10, 8);
        let ppennd = Number(pennding).toFixed(2);
        lockedUsdce = Number(ppennd) / 2;
        burnedFromRenaming = app.burnedFromRenaming;
        calculateTotalDailyEmission = app.calculateTotalDailyEmission;
        let pendingDolarr1 = Number(calculateTotalDailyEmission) * nctrPrice;
        let pennding1 = pendingDolarr1 * Math.pow(10, 8);
        let ppennd1 = Number(pennding1).toFixed(2);
        lockedUsdce1 = Number(ppennd1) / 2;
        creationMinPrice = app.creationMinPrice;
        networkID = app.networkID;
    }

    const accountBalance = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.usdce;
    });

    const accountBalanceNCTR = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.nctr;
    });

    const isBloomboxUSDCe = useSelector<IReduxState, boolean>(state => {
        return state.account.approvals && state.account.approvals.isBloomBoxApproved;
    });

    const isBloomboxNCTR = useSelector<IReduxState, boolean>(state => {
        return state.account.approvals && state.account.approvals.isBloomBoxNCTRApproved;
    });

    let isBloomboxUSDCeApproved = false;

    let isBloomboxNCTRApproved = false;

    let usdceBalance = "";

    let NCTRBalance = "";

    if (accountBalance != null) {
        usdceBalance = accountBalance.toString();
    }

    if (accountBalanceNCTR != null) {
        NCTRBalance = accountBalanceNCTR.toString();
    }

    if (isBloomboxUSDCe != null) {
        isBloomboxUSDCeApproved = isBloomboxUSDCe;
    }

    if (isBloomboxNCTR != null) {
        isBloomboxNCTRApproved = isBloomboxNCTR;
    }

    return (
        <>
            {" "}
            <Col className="teammanagementCol" md={12} xl={3} lg={6} xs={12}>
                <Card className="teamCard1">
                    <CardBody className="infoCardBody cardBody3">
                        <div className="contentWrapper contentWrapper3">
                            <div className="headerWrapperBox">
                                <span className="headerText">BloomBox</span>{" "}
                                <FlowerButton
                                    action="create"
                                    usdcevalue={usdceBalance}
                                    nctrValue={NCTRBalance}
                                    isNCTRApprved={isBloomboxNCTRApproved}
                                    isUsdceApproved={isBloomboxUSDCeApproved}
                                    nodeId={1}
                                />
                            </div>
                            <div className="cardValueWrapper">
                                <div className="cardValueContainer">
                                    <p className="headerText">TOTAL : {isAppLoading ? <Skeleton width="100px" /> : `${new Intl.NumberFormat("en-US").format(totalFlowers)}`}</p>
                                    <p className="subheadText">/BloomBox</p>
                                </div>
                            </div>
                            <div className="tableWrapper33">
                                <div className="rowWrapper">
                                    <p className="subheadText">TVL</p>
                                    <p className="subheadText">${`${new Intl.NumberFormat("en-US").format(lockedUsdce)}`}</p>
                                </div>
                                <div className="rowWrapper">
                                    <p className="subheadText">Emissions Daily</p>
                                    <p className="subheadText">0 $NCTR</p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

export default TotalCard;
