import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardBody, Col } from "reactstrap";
import { BarChart, Bar, Cell, ResponsiveContainer } from "recharts";
import TrendingUpIcon from "mdi-react/TrendingUpIcon";
import "../teamManagement.scss";
import CurrentUsers from "./charts/CurrentUsers";

const data = [
    { id: 0, name: "Page A", uv: 4000 },
    { id: 1, name: "Page B", uv: 3000 },
    { id: 2, name: "Page C", uv: 2000 },
    { id: 3, name: "Page D", uv: 2780 },
    { id: 4, name: "Page E", uv: 1890 },
    { id: 5, name: "Page F", uv: 2390 },
    { id: 6, name: "Page G", uv: 3490 },
    { id: 7, name: "Page H", uv: 2000 },
    { id: 8, name: "Page I", uv: 2780 },
    { id: 9, name: "Page J", uv: 1890 },
];

const NewOrders = () => {
    const { t } = useTranslation("common");
    const [activeIndex, setActiveIndex] = useState(0);
    const activeItem = data[activeIndex];

    const handleClick = item => {
        const index = data.indexOf(item.payload);
        setActiveIndex(index);
    };

    return (
        <Col md={12} xl={3} lg={6} xs={12} className="teammanagementCol">
            <Card className="teamCard1">
                <CardBody className="dashboard__card-widget">
                    <div className="card__title">
                        <h5 className="bold-text">CHECK STATS</h5>
                    </div>
                    <div className="">
                        {" "}
                        <div className="margintop">
                            <label className="labelname">Wallet: </label>

                            <div className="fleex borrderr">
                                <input className="getDownlineWallet input1" type="text" name="name" />
                                <input className="getDownlineWallet1" type="submit" value="My" />
                            </div>
                            <input className="getDownlineWallet" type="submit" value="Get" />
                        </div>
                    </div>
                    <div>
                        <div className="bloomerInfoWrapper">
                            <div className="bloomerInfoContaner">
                                <p className="labelname1">DIRECTS</p>
                            </div>
                            <div className="bloomerInfoContaner">
                                <p className="labelname1">15</p>
                            </div>
                        </div>
                        <div className="bloomerInfoWrapper">
                            <div className="bloomerInfoContaner">
                                <p className="labelname1">TEAM</p>
                            </div>
                            <div className="bloomerInfoContaner">
                                <p className="labelname1">15</p>
                            </div>
                        </div>
                        <div className="bloomerInfoWrapper">
                            <div className="bloomerInfoContaner">
                                <p className="labelname1">NET DEPOSIT</p>
                            </div>
                            <div className="bloomerInfoContaner">
                                <p className="labelname1">15 $NCTR</p>
                            </div>
                        </div>
                        <div className="bloomerInfoWrapper">
                            <div className="bloomerInfoContaner">
                                <p className="labelname1">SCORE</p>
                            </div>
                            <div className="bloomerInfoContaner">
                                <p className="labelname1">15</p>
                            </div>
                        </div>
                        <div className="bloomerInfoWrapper">
                            <div className="bloomerInfoContaner">
                                <p className="labelname1">Airdrop Sent / Received</p>
                            </div>
                            <div className="bloomerInfoContaner">
                                <p className="labelname1">15 $NCTR/ 100 $NCTR</p>
                            </div>
                        </div>
                        <div className="bloomerInfoWrapper">
                            <div className="bloomerInfoContaner">
                                <p className="labelname1">Airdrop Last Sent</p>
                            </div>
                            <div className="bloomerInfoContaner">
                                <p className="labelname1">15</p>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default NewOrders;
