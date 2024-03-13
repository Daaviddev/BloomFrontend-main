import React from "react";
import { Col, Container, Row } from "reactstrap";
import MatTable from "./components/MatTable";
function MaterialTable({ downlines, nctrAmount }) {
    return (
        <Container className="">
            <Row className="">
                <MatTable downlines={downlines} nctrAmount={nctrAmount} />
            </Row>
        </Container>
    );
}

export default MaterialTable;
