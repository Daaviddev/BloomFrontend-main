import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Col } from "reactstrap";
import { AreaChart, Tooltip, Area, ResponsiveContainer, XAxis } from "recharts";
import TrendingUpIcon from "mdi-react/TrendingUpIcon";
import { trim } from "src/helpers";

const data = [
    { name: "Mon", bch: 70.23 },
    { name: "Tue", bch: 80.5 },
    { name: "Wed", bch: 38.45 },
    { name: "Thu", bch: 89.2 },
    { name: "Fri", bch: 105.61 },
    { name: "Sat", bch: 98.6 },
    { name: "Sun", bch: 115 },
];

const CustomTooltip = ({ active, payload }) => {
    if (active) {
        return (
            <div className="dashboard__total-tooltip">
                <p className="label">{`$${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.number,
        }),
    ),
};

CustomTooltip.defaultProps = {
    active: false,
    payload: null,
};

const BCH = () => {
    const [activeIndex] = useState(0);
    const dir = "ltr";
    return (
        <Col md={12} xl={3} lg={6} xs={12} className="teammanagementCol blurMe">
            <Card className="teamCard1">
                <CardBody className="dashboard__card-widget">
                    <div className="card__title">
                        <h5 className="bold-text">Bch</h5>
                    </div>
                    <div className="dashboard__total dashboard__total--area">
                        <TrendingUpIcon className="dashboard__trend-icon" />
                        <p className="dashboard__total-stat">${trim(data[activeIndex].bch, 2)}</p>
                        <div className="dashboard__chart-container">
                            <ResponsiveContainer height={70}>
                                <AreaChart data={data} margin={{ top: 0, left: 0, bottom: 0 }}>
                                    <Tooltip content={<CustomTooltip />} />
                                    <XAxis hide reversed={dir === "rtl"} />
                                    <Area name="BCH" type="monotone" dataKey="bch" fill="#6faae1" stroke="#6faae1" fillOpacity={0.2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default BCH;
