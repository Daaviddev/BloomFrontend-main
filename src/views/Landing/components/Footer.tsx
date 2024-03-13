import React from "react";
import { Col, Row, Container } from "reactstrap";

const background = `${process.env.PUBLIC_URL}/img/landing/footer_bg.png`;

const Footer = () => (
    <footer className="landing__footer">
        <img className="landing__footer-background" src={background} alt="" />
        <Container>
            <Row>
                <Col md={12}>
                    <div className="disclamer">
                        <p className="disclamerText">!!!DISCLAMER!!!</p>
                        <p className="disclamerInfo">
                            Pick from 1-3 of the DFDG’s audited gamified protocols. There are several ways to maximize your rewards, while also mitigating SOME risk. (DeFi in
                            general is a highly volatile and a dangerous investment avenue/strategy. Please, “Do Your Own Research” “DYOR” and only invest with extreme caution. The
                            Dark Forest Development Group, (“DFDG”), is not responsible or liable for any financial losses associated with Bloom, BloomBox, Bloomify, Bloom NFT
                            collection, DF “Dark Forest” Deer and Predator NFT collection, or any additional “expansion” “officially” associated with the “Dark Forest Development
                            Group” (DFDG)
                        </p>{" "}
                    </div>
                </Col>
                <Col md={12}>
                    <p className="landing__footer-text">
                        Made with love and tons of coffee by
                        <b>
                            <a className="blueColor"> Apex Predator</a>
                        </b>
                    </p>
                </Col>
            </Row>
        </Container>
    </footer>
);

export default Footer;
