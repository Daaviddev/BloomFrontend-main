import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardBody } from "reactstrap";
import "./teamManagement.scss";
import TotalProducts from "./components/TeamLeaderStats";
import ProductSales from "./components/ProductSales";
import FilterDownlines from "./components/FilterDownlines";
import MaterialTable from "./components/materialTable";
import UserChart from "./components/charts/UserChart";
import AirdropsSent from "./components/AirdropsSent";
import DirectAirdrop from "./components/DirectAirdrop";
import { useDispatch, useSelector } from "react-redux";
import { IReduxState } from "src/store/slices/state.interface";
import { ButtonItem } from "@progress/kendo-react-buttons/dist/npm/ListButton/ButtonItem";
import { bloomifyGetDownlines, getTeamLeaderInfo, ITeamData } from "src/store/slices/teammanagement-slice";
import { useWeb3Context } from "src/hooks";
import { sleep } from "src/helpers";
import { render } from "react-dom";
import MatTable from "./components/materialTable/components/MatTable";
import MyTeamStats from "./components/MyTeamStats";
import TeamLeaderStats from "./components/TeamLeaderStats";

function TeamManagement() {
    const accountBalance = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.nctr;
    });

    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();
    const [list, setList] = useState<any[]>([]);
    const [teamData, setTeamData] = useState<ITeamData>();
    const [teamWallet, setTeamWallet] = useState("");

    const onRefreshData = async () => {
        if (await checkWrongNetwork()) return;
        else {
            setList(await bloomifyGetDownlines(provider, address, chainID));
            setTeamData(await getTeamLeaderInfo(provider, address, chainID));
        }
    };

    let usdceBalance = "";

    if (accountBalance != null) {
        usdceBalance = parseInt(accountBalance, 10).toString();
    }

    let UplineWallet = "0x";
    let UplineIsTeamWallet = false;
    let UplineTotalTeamMemers = "0";
    let UplineAirdropsSent = "0";
    let UplineLastAirdropTime = "0";

    let DownlineCompoundsNCTR = "0";
    let DownlineCompoundsUSDCe = "0";
    let DownlineDepositsNCTR = "0";
    let DownlineDepositsUSDCe = "0";
    let TeamWallet = false;
    let TeamMembers = "0";
    let AirdropsSent = "0";

    if (teamData != undefined) {
        UplineWallet = teamData.UplineWallet;
        UplineIsTeamWallet = teamData.UplineIsTeamWallet;

        UplineTotalTeamMemers = teamData.UplineTotalTeamMemers;
        UplineAirdropsSent = teamData.UplineAirdropsSent;
        UplineLastAirdropTime = teamData.UplineLastAirdropTime;

        DownlineCompoundsNCTR = teamData.DownlineCompoundsNCTR;
        DownlineCompoundsUSDCe = teamData.DownlineCompoundsUSDCe;
        DownlineDepositsNCTR = teamData.DownlineDepositsNCTR;
        DownlineDepositsUSDCe = teamData.DownlineDepositsUSDCe;
        TeamWallet = teamData.TeamWallet;
        TeamMembers = teamData.TeamMembers;
        AirdropsSent = teamData.AirdropsSent;

        if (teamWallet == "") {
            setTeamWallet(UplineWallet);
        }
    }

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        if (list.length < 1) {
            onRefreshData();
        }
    });

    return (
        <>
            {" "}
            <div className="newAge">
                <div className="setThis1  is-sticky">
                    <p className="bold-text1 textheight1"> MANAGE</p>
                </div>
                <Container className="teamContainer">
                    <Row className="teamRow teamBox22">
                        <TeamLeaderStats
                            wallet={UplineWallet}
                            isTeamWallet={UplineIsTeamWallet}
                            TotalTeamMembers={UplineTotalTeamMemers}
                            AirdropsSentUpline={UplineAirdropsSent}
                            LastAdTimeUpline={UplineLastAirdropTime}
                        />
                        <MyTeamStats
                            wallet={UplineWallet}
                            DownlineCompoundsNCTR={DownlineCompoundsNCTR}
                            DownlineCompoundsUSDCe={DownlineCompoundsUSDCe}
                            DownlineDepositsUSDCe={DownlineDepositsUSDCe}
                            DownlineDepositsNCTR={DownlineDepositsNCTR}
                            TeamMembers={TeamMembers}
                            AirdropsSent={AirdropsSent}
                        />
                    </Row>
                    {/* <Row className="teamRow teamBox">{/* <UserChart /></Row>
                    <Row className="teamRow teamBox"></Row> */}
                    <Row className="teamRow teamBox2">
                        {/* <FilterDownlines /> */}
                        <div className="flexMe">{list.length > 0 ? <MatTable downlines={list} nctrAmount={usdceBalance}></MatTable> : ""}</div>
                    </Row>
                    <Row className="teamRow teamBox">
                        {/* <DirectAirdrop></DirectAirdrop>
                    <AirdropsSent></AirdropsSent> */}
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default TeamManagement;
