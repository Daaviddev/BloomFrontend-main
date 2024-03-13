import { useSelector } from "react-redux";
import { Grid, Zoom } from "@material-ui/core";
import "./bloombox.scss";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { IBloomBoxInfo, IFlowerInfoDetails } from "../../store/slices/account-slice";
import ToolBar from "./ToolBar";
import DFCard from "./ApeCard";
import { IAppSlice } from "../../store/slices/app-slice";
import { IAccountSlice } from "../../store/slices/account-slice";
import { trim } from "../../helpers";
import { Col, Container, Row, Card, CardBody } from "reactstrap";
import FlowerCard from "./FlowerCard";
import "../../views/Bloomify/bloomify.scss";
import "../TeamManagement/teamManagement.scss";
import BudgetStatistic from "./components/BudgetStatistic";
import FlowerButton from "./ToolBar/flowerButton";
import PendingCard from "./components/info/pendingCard";
import NCTRCard from "./components/info/NCTRCard";
import TotalCard from "./components/info/totalCard";

function BloomBox() {
    const planets = useSelector<IReduxState, IFlowerInfoDetails[]>(state => {
        return state.account.planets;
    });

    const accont = useSelector<IReduxState, IAccountSlice>(state => {
        return state.account;
    });

    let bloomboxs = accont.bloombox;

    const app = useSelector<IReduxState, IAppSlice>(state => state.app);

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

    let Pending = "";

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

    if (isBloomboxNCTR != null) {
    }

    if (app != undefined) {
        //  console.log("number", app.getNumberOfNodesAutoCompounding);
    }

    return (
        <>
            <div className="newAge">
                <div className="setThis1 is-sticky">
                    <p className="bold-text1 textheight1"> BLOOMBOX</p>
                </div>
                <Container className="teamContainer">
                    <Row className="teamRow teamBox">
                        <PendingCard pendingReward={accont.totalpending}></PendingCard>
                        <TotalCard></TotalCard>
                        <NCTRCard></NCTRCard>
                    </Row>
                    {/* BUTTONS */}
                    <Row className="height00">
                        {/* <BudgetStatistic></BudgetStatistic>
                        <BudgetStatistic></BudgetStatistic> */}
                        {planets == undefined ? <></> : <ToolBar planets={planets} />}
                    </Row>
                    {/* BUTTONS END */}
                    {/* FLOWERS */}
                    <Row className="teamRow teamBox33">
                        {" "}
                        <p className="myBloomboxesDiv bold-text1 textheight1">MY BLOOMBOX</p>
                        <div className="teamDIv33">
                            {accont.bloombox == undefined ? (
                                <Skeleton width="100px" />
                            ) : (
                                accont.bloombox.map(bloombox => (
                                    <div className="teamRow heightNode">
                                        {" "}
                                        <FlowerCard bloombox={bloombox} NCTRBalance={Number(NCTRBalance)} />
                                    </div>
                                ))
                            )}{" "}
                        </div>
                    </Row>
                </Container>
            </div>
            {/* FLOWERS END */}
        </>
    );
}

export default BloomBox;
