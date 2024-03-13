import React, { useState } from "react";
import "../teamManagement.scss";
import { Button, ButtonToolbar, Card, CardBody, Col } from "reactstrap";

const optionsCampaign = [
    { label: "Divide Budget", value: "divide" },
    { label: "Reward Random", value: "random" },
];
const optionsDirects = [
    { label: "1", value: "1" },
    { label: "5", value: "5" },
    { label: "10", value: "10" },
];
const optionsDepth = [
    { label: "T1", value: "1d" },
    { label: "T2", value: "2d" },
    { label: "T10", value: "10d" },
    { label: "T15", value: "15d" },
];
const optionsNet = [
    { label: "1+ $NCTR", value: "1" },
    { label: "50+ $NCTR", value: "50" },
    { label: "100+ $NCTR", value: "100" },
    { label: "250+ $NCTR", value: "250" },
    { label: "500+ $NCTR", value: "500" },
    { label: "1000+ $NCTR", value: "1000" },
    { label: "2000+ $NCTR", value: "2000" },
];
const optionsCompounds = [
    { label: "6/1", value: "61" },
    { label: "6/2", value: "62" },
];

const FilterDownlines = () => {
    const fetchDownlines = async () => {};

    const [campaign, setValue] = React.useState("");
    const [directs, setValue2] = React.useState("");
    const [depth, setValue3] = React.useState("");
    const [net, setValue4] = React.useState("");
    const [compound, setValue5] = React.useState("");

    const handleChange = event => {
        setValue(event.target.value);
    };

    const handleChange2 = event => {
        setValue2(event.target.value);
    };

    const handleChange3 = event => {
        setValue3(event.target.value);
    };

    const handleChange4 = event => {
        setValue4(event.target.value);
    };

    const handleChange5 = event => {
        setValue5(event.target.value);
    };

    return (
        <Col md={12} xl={3} lg={6} xs={12} className="teammanagementCol">
            <Card className="teamCard1">
                <CardBody className="dashboard__card-widget">
                    <div className="card__title">
                        <h5 className="bold-text">FILTER DOWNLINES</h5>
                    </div>
                    <div className="margintop">
                        <div className="">
                            {" "}
                            <label className="labelname">Wallet: </label>
                            <div className="fleex borrderr">
                                <input className="getDownlineWallet input1" type="text" name="name" />
                                <input className="getDownlineWallet1" type="submit" value="My" />
                            </div>
                        </div>
                        <div className="fleex additionalFlex">
                            <div className="setFlex">
                                <label className="labelname">Campaign: </label>
                                <select className="getDownlineWallet3 input1" value={campaign} onChange={handleChange}>
                                    {optionsCampaign.map(optionsCampaign => (
                                        <option value1={optionsCampaign.value}>{optionsCampaign.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="setFlex">
                                <label className="labelname">Budget: </label>
                                <div className="setFlex1 sto">
                                    <input className="getDownlineWallet osm input1" type="text" name="name" />
                                    <input className="getDownlineWallet dvs" type="submit" value="Max" />
                                </div>
                            </div>
                        </div>
                        <div className="fleex additionalFlex">
                            <div className="setFlex">
                                <label className="labelname">Minimum Directs: </label>
                                <select className="getDownlineWallet input1" value={directs} onChange={handleChange2}>
                                    {optionsDirects.map(optionsDirects => (
                                        <option value2={optionsDirects.value}>{optionsDirects.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="setFlex">
                                <label className="labelname">Team Depth: </label>
                                <select className="getDownlineWallet input1" value={depth} onChange={handleChange3}>
                                    {optionsDepth.map(optionsDepth => (
                                        <option value={optionsDepth.value}>{optionsDepth.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="fleex additionalFlex">
                            <div className="setFlex">
                                <label className="labelname">Min. Net Deposit: </label>
                                <select className="getDownlineWallet input1" value={net} onChange={handleChange4}>
                                    {optionsNet.map(optionsNet => (
                                        <option value={optionsNet.value}>{optionsNet.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="setFlex">
                                <label className="labelname">Compounds (last 7 days): </label>
                                <select className="getDownlineWallet input1" value={compound} onChange={handleChange5}>
                                    {optionsCompounds.map(optionsCompounds => (
                                        <option value={optionsCompounds.value}>{optionsCompounds.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flexOnFlex1">
                            <input className="getDownlineWallet dvs" type="submit" value="GET" />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default FilterDownlines;
