import React from "react";
import { useTranslation } from "react-i18next";
import { PieChart, Pie } from "recharts";
import Panel from "../../../shared/components/Panel";

const pieChartData = [
    { value: 60, fill: "#2196f3" },
    { value: 40, fill: "#f2f4f7" },
];

const CurrentUsers = () => {
    const { t } = useTranslation("common");

    return (
        <Panel className="newclassName" lg={3} xl={1} md={6} title="Downline Depth" subhead="">
            <div className="dashboard__current-users newclassName">
                <div className="dashboard__current-users-chart">
                    <PieChart height={150} width={280}>
                        <Pie data={pieChartData} dataKey="value" cx={135} cy={140} startAngle={180} endAngle={0} innerRadius={100} outerRadius={128} paddingAngle={0} />
                    </PieChart>
                    <p className="dashboard__current-users-label depthnumber">345</p>
                </div>
                <div className="dashboard__current-users-info" dir="ltr">
                    <p className="dashboard__current-users-day">
                        <span>0</span>
                    </p>
                    <p className="dashboard__current-users-day">
                        <span>15</span>
                    </p>
                </div>
            </div>
        </Panel>
    );
};

export default CurrentUsers;
