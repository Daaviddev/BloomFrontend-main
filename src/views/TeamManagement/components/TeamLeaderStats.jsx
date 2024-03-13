import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardBody, Col } from "reactstrap";
import { BarChart, Bar, Cell, ResponsiveContainer } from "recharts";
import TrendingUpIcon from "mdi-react/TrendingUpIcon";
import "../teamManagement.scss";

function TeamLeaderStats({ wallet, isTeamWallet, TotalTeamMembers, AirdropsSentUpline, LastAdTimeUpline }) {
    return (
        <Col md={12} xl={3} lg={6} xs={12} className="teammanagementColManage">
            <Card className="teamCard11 addMarginBot">
                <CardBody className="dashboard__card-widget">
                    <div className="card__title1">
                        <h5 className="bold-text">My Team Leader Stats</h5>
                        <h5 className="bold-text2">Wallet : {wallet}</h5>
                    </div>
                    <div className="tableWrapper1">
                        <div className="twoSides">
                            <div className="rowWrapper1">
                                <p className="subheadText">Is Team Wallet: </p>
                                <p className="subheadText">{isTeamWallet.toString()} </p>
                            </div>
                            <div className="rowWrapper1">
                                <p className="subheadText">Total Team Members</p>
                                <p className="subheadText">{TotalTeamMembers}</p>
                            </div>
                        </div>
                        <div className="twoSides">
                            <div className="rowWrapper1">
                                <p className="subheadText">Airdrops Sent: </p>
                                <p className="subheadText"> {AirdropsSentUpline}</p>
                            </div>
                            <div className="rowWrapper1">
                                <p className="subheadText">Last Airdrop Time: </p>
                                <p className="subheadText">{LastAdTimeUpline}</p>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>{" "}
        </Col>
    );
}

export default TeamLeaderStats;
