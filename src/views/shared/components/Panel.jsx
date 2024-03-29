import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Badge, Card, CardBody, Col, Collapse } from "reactstrap";
import CloseIcon from "mdi-react/CloseIcon";
import MinusIcon from "mdi-react/MinusIcon";
import AutorenewIcon from "mdi-react/AutorenewIcon";
import LoadingIcon from "mdi-react/LoadingIcon";
import "../../TeamManagement/teamManagement.scss";

const AlertComponent = ({ md, lg, xl, sm, xs, color, divider, icon, title, label, subhead, before, panelClass, children }) => {
    const [visible, setVisible] = useState(true);
    const [collapse, setCollapse] = useState(true);
    const [refresh, setRefresh] = useState(false);

    const onDismiss = () => {
        setVisible(false);
    };

    const toggleCollapse = () => {
        setCollapse(prevState => !prevState);
    };

    // your async logic here
    const onRefresh = () => {
        setRefresh(true);
    };

    useEffect(() => {
        if (refresh) {
            // fake timeout
            setTimeout(() => setRefresh(false), 5000);
        }
    }, [refresh]);

    if (visible) {
        return (
            <Col className="chartPanel" md={md} lg={lg} xl={xl} sm={sm} xs={xs}>
                <Card
                    className={`panel${color ? ` panel--${color}` : ""}
          ${divider ? " panel--divider" : ""}${collapse ? "" : " panel--collapse"} ${panelClass}`}
                >
                    <CardBody className="panel_body1">
                        <div className="panel_title">
                            <p className="bold-text-here">{title}</p>
                        </div>
                        <Collapse isOpen={collapse}>
                            <div className="panel_content1">{children}</div>
                        </Collapse>
                    </CardBody>
                </Card>
                {before}
            </Col>
        );
    }

    return "";
};

AlertComponent.propTypes = {
    divider: PropTypes.bool,
    color: PropTypes.string,
    title: PropTypes.string,
    subhead: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.string,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
    sm: PropTypes.number,
    xs: PropTypes.number,
    before: PropTypes.element,
    panelClass: PropTypes.string,
};

AlertComponent.defaultProps = {
    divider: false,
    color: "",
    title: "",
    subhead: "",
    label: "",
    icon: "",
    md: 0,
    lg: 0,
    xl: 0,
    sm: 0,
    xs: 0,
    before: null,
    panelClass: "",
};

export default AlertComponent;

export const PanelTitle = ({ title }) => (
    <div className="panel__title">
        <h5 className="bold-text-here-text">{title}</h5>
    </div>
);

PanelTitle.propTypes = {
    title: PropTypes.string.isRequired,
};
