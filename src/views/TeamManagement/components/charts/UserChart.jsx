import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Panel from "../../../shared/components/Panel";
import { useWeb3Context } from "src/hooks";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";

const getRandomArbitrary = (minValue, maxValue) => {
    const ratio = maxValue - minValue + minValue;
    return Math.random() * ratio;
};

const data = [
    {
        name: "29.07",
        pv: 2400,
    },
    {
        name: "28.07",
        pv: 1398,
    },
    {
        name: "27.07",
        pv: 9800,
    },
    {
        name: "Page D",
        pv: 3908,
    },
    {
        name: "Page E",
        pv: 4800,
    },
    {
        name: "Page F",
        pv: 3800,
    },
    {
        name: "Page G",
        pv: 4300,
    },
];

function UserChart() {
    // var CurrentDate = Moment();

    var dates = [];

    const myGreeting = () => {
        return 1;
    };

    const getDates = () => {
        // if (dates.length) {
        //     let iterateDate = CurrentDate;

        //     for (let index = 0; index < 7; index++) {
        //         dates.push(iterateDate.format());
        //         iterateDate = iterateDate.subtract(1, "days");
        //     }
        // }
        return 1;
    };

    useEffect(() => {
        getDates();
        myGreeting();
    }, []);

    return (
        <>
            <div className="crazyCard">
                <Panel className="borrderr " lg={6} xl={9} md={12} title="$NCTR Price" subhead="">
                    <div>
                        <ResponsiveContainer height={195} className="dashboard__active-users-chart ">
                            <LineChart height={195} data={data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Panel>
            </div>
            <div></div>
        </>
    );
}

export default UserChart;
