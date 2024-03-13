import React from "react";
import { useTranslation } from "react-i18next";
import { PieChart, Pie } from "recharts";
import Panel from "../../shared/components/Panel";
import "./budgetStatistics.scss";

const data01 = [
    { value: 50, fill: "#4ce1b6" },
    { value: 50, fill: "#eeeeee" },
];

const BudgetStatistic = () => {
    const { t } = useTranslation("common");

    return (
        <Panel md={12} lg={6} xl={4} title="Holdings">
            <div className="dashboard__stat dashboard__stat--budget dashboardStyle blurMe">
                <div className="dashboard__stat-main">
                    <p className="dashboard__stat-main-title totalBudget">Max Payment</p>
                    <p className="dashboard__stat-main-number totalBudgetNumber">1 000 $NCTR</p>
                </div>
                <div className="dashboard__stat-chart peChart">
                    <PieChart className="peChartWrapper" height={120} width={120}>
                        <Pie data={data01} dataKey="value" cx={55} cy={55} innerRadius={50} outerRadius={60} />
                    </PieChart>
                    <p className="dashboard__stat-label dollarSign">$</p>
                </div>
                <div className="dashboard__stat-data info textInfo">
                    <div>
                        <p className="dashboard__stat-data-number dollarTextInfo">500 $NCTR</p>
                        <p style={{ color: "#64677b" }} className="dollarDollarInfo">
                            Completed
                        </p>
                    </div>
                    <div>
                        <p className="dashboard__stat-data-number dollarTextInfo">500 $NCTR</p>
                        <p style={{ color: "#4ce1b6" }} className="dollarDollarInfo">
                            Remaining
                        </p>
                    </div>
                </div>
            </div>
        </Panel>
    );
};

export default BudgetStatistic;
