import React from "react";
import { Col, Container, Row } from "reactstrap";
import "../landingStyle.scss";
import teamImgs from "../../../assets/BloomAssets/6.png";
import { HashLink } from "react-router-hash-link";

const About = () => (
    <section className="landing_section1">
        <Container className="landingCont">
            <Row className="landingRow1" id="about-section">
                <Col className="technologyCol" md={6}>
                    <p className="bigSecurityText textLeft">About Us</p>
                    <p className="landing_feedback-subhead">
                        The main objective of the Bloom team is to create a grand ecosystem that all investors can call home. With an entire ecosystem, investors can avoid
                        spreading their hard-earned money too thin. The Bloom Team's development goals are to evolve existing protocols, as well as building new and exciting
                        original smart contracts. This development goal makes the BLOOM Ecosystem one of the most promising projects in DeFi. A one-stop-shop for seamless cross
                        chain utility, passive income, hyper treasury building, statistical treasury management, Trunk Bank, cross chain Dex, treasury backed stablecoin, and cross
                        chain NFT marketplace. The Dev Team will always be committed to looking into new and exciting DeFi innovations that can benefit our community and ecosystem.
                    </p>
                </Col>
                <Col className="technologyCol" md={6}>
                    <img className="compoundImg" src={teamImgs} />
                </Col>
            </Row>{" "}
            <Row className="spacedRow" id="project-section">
                <div className="headingTextFix">
                    <p className="codeSmallText blueColor">ECOSYSTEM</p>
                    <p className="codeBigText">PROJECTS</p>
                    <p className="codeClassicText textFix">
                        Here are all of the active projects within the Bloom Ecosystem. As we continue to expand the ecosystem, you will find all additional projects below. Click
                        the "Learn More" button on each project to find out more about each one.
                    </p>
                </div>
                <div className="landing_header-language-wrap">
                    <div className="box">
                        <div className="icon">01</div>
                        <div className="content">
                            <h3>Bloomify</h3>
                            <HashLink className="learnMoreLink" smooth to="#bloomifysection">
                                Learn More
                            </HashLink>
                        </div>
                    </div>
                    <div className="box">
                        <div className="icon">02</div>
                        <div className="content">
                            <h3>BloomBox</h3>
                            <a href="https://darkforestmoney.gitbook.io/bloom-nodes/" className="learnMoreLink">
                                Read More
                            </a>
                        </div>
                    </div>
                    <div className="box">
                        <div className="icon">03</div>
                        <div className="content">
                            <h3>DeerNFT</h3>
                            <a href="https://darkforestmoney.gitbook.io/deer-+-predator-nfts/" className="learnMoreLink">
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    </section>
);

export default About;
