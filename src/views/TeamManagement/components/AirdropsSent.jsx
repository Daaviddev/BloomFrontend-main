import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Panel from "../../shared/components/Panel";
import getTooltipStyles from "../../shared/helpers";

const data01 = [
    {
        id: 0,
        name: "Received",
        value: 12934,
        fill: "#4ce1b6",
    },
    {
        id: 1,
        name: "Sent",
        value: 9934,
    },
];

const renderLegend = ({ payload }) => (
    <ul className="dashboard__chart-legend">
        {payload.map(entry => (
            <li key={entry.payload.id}>
                <span style={{ backgroundColor: entry.color }} />
                {entry.value}
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

const AirdropsSent = () => {
    const { t } = useTranslation("common");
    const [coordinates, setCoordinate] = useState({ x: 0, y: 0 });

    const onMouseMove = e => {
        if (e.tooltipPosition) {
        }
    };

    return (
        <Panel lg={12} xl={6} md={12} xs={12} title="Sent/Received Airdrops">
            <div>
                <ResponsiveContainer className="dashboard__chart-pie dashboard__chart-pie--commerce" height={360}>
                    <PieChart className="dashboard__chart-pie-container">
                        <Tooltip position={coordinates} {...getTooltipStyles("dark")} />
                        <Pie data={data01} dataKey="value" cy={180} innerRadius={100} outerRadius={130} label onMouseMove={onMouseMove} />
                        <Legend layout="vertical" verticalAlign="bottom" wrapperStyle="" align="left" content={renderLegend} color="white" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Panel>
    );
};

export default AirdropsSent;
