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
import { IAccountSlice } from "src/store/slices/account-slice";
import { Skeleton } from "@material-ui/lab";
import FlowerButton from "src/views/BloomBox/ToolBar/flowerButton";

const NCTRCard = () => {
    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();
    const [wallet, setWallet] = useState<string>("");
    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const app = useSelector<IReduxState, IAppSlice>(state => state.app);

    const isAccountLoading = useSelector<IReduxState, boolean>(state => state.account.loading);
    const account = useSelector<IReduxState, IAccountSlice>(state => state.account);

    let usdcePrice = 0;
    let totalSupply = 0;
    let totalFlowers = 0;
    let nctrPrice = "0";
    let totalValueLocked = 0;
    let burnedFromRenaming = 0;
    let calculateTotalDailyEmission = 0;
    let creationMinPrice = "";
    let networkID = 0;

    if (app != undefined) {
        usdcePrice = app.usdcePrice;
        totalSupply = app.totalSupply;
        totalFlowers = app.totalFlowers;
        let nctrnumber = trim(Number(app.nctrPrice) * Math.pow(10, 8), 2);
        nctrPrice = nctrnumber.toString();
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
                <Card className="teamCard1">
                    <CardBody className="infoCardBody cardBody3">
                        <div className="contentWrapper contentWrapper3">
                            <div className="headerWrapperBox">
                                <span className="headerText">$NCTR Price</span>
                            </div>
                            <div className="cardValueWrapper">
                                <div className="cardValueContainer">
                                    <p className="subheadText">$</p>
                                    <p className="headerText"> {nctrPrice}</p>
                                    <p className="subheadText"> /USD</p>
                                </div>
                            </div>
                            <div className="tableWrapper33">
                                <div className="rowWrapper">
                                    <p className="subheadText">Supply</p>
                                    <p className="subheadText">{isAppLoading ? <Skeleton width="100px" /> : `${new Intl.NumberFormat("en-US").format(app.totalSupply)} NCTR`}</p>
                                </div>
                                <div className="rowWrapper">
                                    <p className="subheadText">Burned</p>
                                    <p className="subheadText">
                                        {isAppLoading ? (
                                            <Skeleton width="250px" />
                                        ) : (
                                            `${new Intl.NumberFormat("en-US").format(Math.floor(Math.round(Math.floor(app.burnedFromRenaming) / 1000000)))} NCTR`
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

export default NCTRCard;
