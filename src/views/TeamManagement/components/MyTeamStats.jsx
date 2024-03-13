import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardBody, Col } from "reactstrap";
import { BarChart, Bar, Cell, ResponsiveContainer } from "recharts";
import TrendingUpIcon from "mdi-react/TrendingUpIcon";
import "../teamManagement.scss";
import { useWeb3Context } from "src/hooks";
import { fixAPRBloomify } from "src/store/slices/bloomify-thunk";
import { useDispatch, useSelector } from "react-redux";

function MyTeamStats({ wallet, DownlineCompoundsNCTR, DownlineCompoundsUSDCe, DownlineDepositsUSDCe, DownlineDepositsNCTR, TeamMembers, AirdropsSent }) {
    let teamWallet = "You Are Not Team Wallet!";

    if (Number(TeamMembers) >= 5) {
        teamWallet = "You Are Team Wallet!";
    }

    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();
    const dispatch = useDispatch();

    const handleFixAPR = async () => {
        if (await checkWrongNetwork()) {
            return;
        } else {
            if (wallet != "0x") {
                dispatch(fixAPRBloomify({ wallet, provider, address, networkID: chainID }));
            }
        }
    };

    return (
        <Col md={12} xl={3} lg={6} xs={12} className="teammanagementColManage">
            <Card className="teamCard11">
                <CardBody className="dashboard__card-widget">
                    <div className="card__title1">
                        <h5 className="bold-text">My Stats</h5>
                        <input className="getDownlineWallet dvs doubleButton" type="submit" value="Fix APR" onClick={handleFixAPR} />
                        <h5 className="bold-text addmarg">{teamWallet}</h5>
                    </div>
                    <div className="tableWrapper1">
                        <div className="twoSides">
                            <div className="rowWrapper1">
                                <p className="subheadText">Downline Compounds: </p>
                                <p className="subheadText">{DownlineCompoundsUSDCe} $NCTR</p>
                            </div>
                            <div className="rowWrapper1">
                                <p className="subheadText">Downline Compounds:</p>
                                <p className="subheadText">{DownlineCompoundsNCTR} $USDC.e</p>
                            </div>
                            <div className="rowWrapper1">
                                <p className="subheadText">Team Members:</p>
                                <p className="subheadText">{TeamMembers}</p>
                            </div>
                        </div>
                        <div className="twoSides">
                            <div className="rowWrapper1">
                                <p className="subheadText">Downline Deposits: </p>
                                <p className="subheadText">{DownlineDepositsNCTR} $NCTR</p>
                            </div>
                            <div className="rowWrapper1">
                                <p className="subheadText">Downline Deposits: </p>
                                <p className="subheadText">{DownlineDepositsUSDCe} $USDC.e</p>
                            </div>
                            <div className="rowWrapper1">
                                <p className="subheadText">Airdrops Sent</p>
                                <p className="subheadText">{AirdropsSent} $NCTR</p>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>{" "}
        </Col>
    );
}

export default MyTeamStats;
