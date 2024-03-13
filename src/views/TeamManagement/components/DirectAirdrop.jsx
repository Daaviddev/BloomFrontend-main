import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import getTooltipStyles from "../../shared/helpers";
import ArrowDownwardIcon from "mdi-react/ArrowDownwardIcon";
import Panel from "../../shared/components/Panel";

const dir = "ltr";

const data = [
    {
        id: 0,
        name: "Completed",
        value: 2500,
        fill: "#b8e986",
    },
    {
        id: 1,
        name: "Online check-in",
        value: 2500,
        fill: "#4ce1b6",
    },
    {
        id: 2,
        name: "Remain",
        value: 5000,
        fill: "#f2f4f7",
    },
];

const style = dir => {
    const left = dir === "ltr" ? { left: 0 } : { right: 0 };
    return {
        ...left,
        marginTop: "-5px",
        lineHeight: "16px",
        position: "absolute",
    };
};

const renderLegend = ({ payload }) => (
    <ul className="dashboard__booking-reservations-chart-legend dashboard__chart-legend">
        {payload.map(entry => (
            <li key={entry.payload.id}>
                <span style={{ backgroundColor: entry.color }} />
                <p>{entry.value}</p>
            </li>
        ))}
    </ul>
);

renderLegend.propTypes = {
    payload: PropTypes.arrayOf(
        PropTypes.shape({
            color: PropTypes.string,
            value: PropTypes.string,
        }),
    ).isRequired,
};

const DirectAirdrop = () => {
    const { t } = useTranslation("common");
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

    return (
        <Panel lg={6} xl={3} md={12} title="Direct Airdrop" subhead="" panelClass="dashboard__booking-reservations-panel">
            <div className="dashboard__booking-reservations">
                <div className="dashboard__booking-reservations-chart">
                    <ResponsiveContainer className="newflex">
                        <>
                            <div className="newFlex directAir">
                                <div className="airdropSpace">
                                    {" "}
                                    <label className="labelname">Wallet: </label>
                                    <div className="fleex borrderr">
                                        <input className="getDownlineWallet input1" type="text" name="name" />
                                    </div>
                                </div>
                                <div className="airdropSpace">
                                    {" "}
                                    <label className="labelname">$NCTR Amount: </label>
                                    <div className="fleex borrderr">
                                        <input className="getDownlineWallet input1" type="text" name="name" />
                                        <input className="getDownlineWallet1" type="submit" value="Max" />
                                    </div>
                                </div>
                            </div>
                            <div className="flexOnFlex1">
                                <input className="getDownlineWallet dvs" type="submit" value="SEND" />
                            </div>
                        </>
                    </ResponsiveContainer>
                </div>
            </div>
        </Panel>
    );
};

DirectAirdrop.propTypes = {};

export default DirectAirdrop;
