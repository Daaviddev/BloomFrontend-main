import { useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
import "../../../../TeamManagement/teamManagement.scss";
import "../../../../Bloomify";
import { useWeb3Context } from "src/hooks";
import { bloomifyCheckPlayer, IBloomifyPlayer } from "src/store/slices/bloomify-thunk";
import { sleep, trim } from "src/helpers";
import { useSelector } from "react-redux";
import { IReduxState } from "src/store/slices/state.interface";
import { IAppSlice } from "src/store/slices/app-slice";
import { IAccountSlice, IBloomifyInfo } from "src/store/slices/account-slice";
import { Skeleton } from "@material-ui/lab";

interface IPending {
    pendingReward: number;
}
const PendingCard = ({ pendingReward }: IPending) => {
    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();
    const [wallet, setWallet] = useState<string>("");
    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const app = useSelector<IReduxState, IAppSlice>(state => state.app);

    const isAccountLoading = useSelector<IReduxState, boolean>(state => state.account.loading);

    const userInfo = useSelector<IReduxState, number>(state => state.account.totalPendingBloombox);

    let valuues = trim(Number(Math.round(pendingReward * 100) / 10000), 2);

    let valuue = Number(valuues);

    const accont = useSelector<IReduxState, IAccountSlice>(state => {
        return state.account;
    });

    let usdcePrice = 0;
    let totalSupply = 0;
    let totalFlowers = 0;
    let nctrPrice = 0;
    let totalValueLocked = 0;
    let burnedFromRenaming = 0;
    let calculateTotalDailyEmission = 0;
    let creationMinPrice = "";
    let networkID = 0;
    let pendingDolar = 0;

    if (app != undefined) {
        usdcePrice = app.usdcePrice;
        totalSupply = app.totalSupply;
        totalFlowers = app.totalFlowers;
        nctrPrice = app.nctrPrice;
        let pendingDolarr = pendingReward * nctrPrice;
        let pennding = pendingDolarr * Math.pow(10, 6);
        let ppennd = trim(Number(pennding), 2);
        pendingDolar = Number(ppennd);
        totalValueLocked = app.totalValueLocked;
        burnedFromRenaming = app.burnedFromRenaming;
        calculateTotalDailyEmission = app.calculateTotalDailyEmission;
        creationMinPrice = app.creationMinPrice;
        networkID = app.networkID;
    }

    return (
        <>
            {" "}
            <Col className="teammanagementCol" md={12} xl={3} lg={6} xs={12}>
                <Card className="teamCard1 addMargins">
                    <CardBody className="infoCardBody cardBody3">
                        <div className="contentWrapper contentWrapper3">
                            <div className="headerWrapperBox">
                                <span className="headerText">Pending Rewards</span>
                            </div>
                            <div className="cardValueWrapper">
                                <div className="cardValueContainer">
                                    <p className="headerText">0.00</p>
                                    <p className="subheadText"> $NCTR</p>
                                </div>
                            </div>
                            <div className="tableWrapper33">
                                <div className="rowWrapper">
                                    <p className="subheadText">Pending $</p>
                                    <p className="subheadText">0.00 $</p>
                                </div>
                                <div className="rowWrapper">
                                    <p className="subheadText">Daily Reward</p>
                                    <p className="subheadText">0.00 $</p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

export default PendingCard;
