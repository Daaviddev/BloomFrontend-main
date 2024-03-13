import { useSelector } from "react-redux";
import { Grid, Zoom } from "@material-ui/core";
import { trim } from "../../helpers";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { IAppSlice } from "../../store/slices/app-slice";
import { IAccountSlice } from "../../store/slices/account-slice";
import { Col, Container, Row, Card, CardBody } from "reactstrap";
import "./bloomify.scss";
import { useEffect, useState } from "react";
import ClaimCard from "./components/BloomifyTopRow/claimCard";
import DepositCard from "./components/BloomifyTopRow/depositCard";
import CheckCard from "./components/BloomifyTopRow/checkCard";
import MintBloom from "../Mint/components/mintBloom";
import InfoCard from "./components/BloomifyTopRow/infoCard";
import MaterialTable from "./components/materialTable";
import UserChart from "../TeamManagement/components/charts/UserChart";
import { useParams } from "react-router-dom";
import { getnctrPrice } from "src/store/slices/bloomify-thunk";
import { useWeb3Context } from "src/hooks";

function Bloomify() {
    const [user, setUser] = useState("");
    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const app = useSelector<IReduxState, IAppSlice>(state => state.app);
    const isAccountLoading = useSelector<IReduxState, boolean>(state => state.account.loading);
    const account = useSelector<IReduxState, IAccountSlice>(state => state.account);
    const [roleValue, setRoleValue] = useState<string>("");

    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();

    let networkID = chainID;

    let nctrPrice = 0;
    const onRefreshData = async () => {
        if (await checkWrongNetwork()) return;
        else {
            nctrPrice = await getnctrPrice(networkID, provider);
        }
    };

    useEffect(() => {
        // Update the document title using the browser API
        onRefreshData();
    });

    // console.log("nctrPrice", nctrPrice);

    return (
        <>
            <div className="newAge">
                <div className="setThis1 is-sticky">
                    <p className="bold-text1 textheight1"> BLOOMIFY</p>
                </div>
                <Container className="teamContainer">
                    {" "}
                    <Row className="teamRow teamBox">
                        <InfoCard></InfoCard>
                        {/* <Col className="infoCol1" md={6} xl={8} lg={7} xs={12}>
                            <MintBloom nftName="bloom"></MintBloom>
                        </Col> */}
                    </Row>
                    <Row className="teamRow teamBox blurMe">
                        {" "}
                        <Col className="infoCol1" md={6} xl={8} lg={7} xs={12}>
                            <div className="splittihsd">
                                <UserChart />
                            </div>
                        </Col>{" "}
                    </Row>
                    <Row className="teamRow teamBox">
                        {" "}
                        <Col className="infoCol1" md={6} xl={8} lg={7} xs={12}>
                            <div className="splittihsd">
                                <MintBloom nftName="bloom"></MintBloom>
                            </div>
                        </Col>{" "}
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Bloomify;
