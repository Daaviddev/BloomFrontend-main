import React from "react";
import { Col, Row, Container } from "reactstrap";
import "../landingStyle.scss";
import testImage from "../../../assets/testFiles/BLOOM NFTS/Untitled design.png";
import { Card } from "reactstrap";
import { AiOutlineIdcard, AiFillMeh, AiFillCheckCircle, AiFillLock } from "react-icons/ai";
import { Link } from "react-router-dom";

const Security = () => (
    <div className="landing_section">
        <Container className="landingCont" id="security-section">
            <Row className="landingRow">
                <Col className="securityColumn" md={12}>
                    <div className="securityContainer">
                        <div className="securityLeftSection">
                            <div>
                                <p className="smallSecurityText blueColor">SECURITY</p>
                            </div>
                            <div>
                                <p className="bigSecurityText">Protocol And User Security</p>
                            </div>
                            <div>
                                <p className="averageSecurityText">
                                    The Bloom Dev team prides itself on transparency and security...here are the security measures in place to ensure you, the investor, can feel
                                    safe in your investment.
                                </p>
                            </div>
                            <div className="securityImageContainer">
                                <img src={testImage} />
                            </div>
                        </div>
                        <div className="securityRightSection">
                            <div className="securityTopRow">
                                <Card className="securityCard">
                                    <div className="securityIconContainer">
                                        <AiOutlineIdcard className="securityIcon" />
                                    </div>
                                    <div className="securityCardHeaderContainer">
                                        <p className="securityCardHeader">KYC</p>
                                    </div>
                                    <div className="securityCardTextContainer">
                                        <p className="securityCardText">
                                            The team is KYC'd by Assure DeFi, but we know that's not enough in DeFi anymore. So we are also KYC'ing with MOD Society which is the
                                            most comprehensive KYC available. (Link to an official document or page if need be)
                                        </p>
                                    </div>
                                    <div className="secuertyCardLinkContiner">
                                        <Link className="securityLinkText" target="https://www.assuredefi.io/projects/dark-forest-x-nature" to="">
                                            Learn More
                                        </Link>
                                    </div>
                                </Card>
                                <Card className="securityCard">
                                    <div className="securityIconContainer">
                                        <AiFillMeh className="securityIcon" />
                                    </div>
                                    <div className="securityCardHeaderContainer">
                                        <p className="securityCardHeader">DOXX</p>
                                    </div>
                                    <div className="securityCardTextContainer">
                                        <p className="securityCardText">
                                            Like we said KYC alone is just not enough to give investors full confidence in a project which is why our Founder Damon, CEO Trey and
                                            CCO Jeremy are all fully Doxxed and the rest are well known by name and face within the community.
                                        </p>
                                    </div>
                                    <div className="secuertyCardLinkContiner">
                                        <Link className="securityLinkText" target="" to="#team-section">
                                            Learn More
                                        </Link>
                                    </div>
                                </Card>
                            </div>
                            <div className="securityBottomRow">
                                <Card className="securityCard">
                                    <div className="securityIconContainer">
                                        <AiFillCheckCircle className="securityIcon" />
                                    </div>
                                    <div className="securityCardHeaderContainer">
                                        <p className="securityCardHeader">AUDIT</p>
                                    </div>
                                    <div className="securityCardTextContainer">
                                        <p className="securityCardText">
                                            We have successfully completed a full contract audit from MOD Society and passed with flying colors and we will continue to audit with
                                            them with every expansion to our ecosystem.
                                        </p>
                                    </div>
                                    <div className="secuertyCardLinkContiner">
                                        <Link className="securityLinkText" target="https://t.co/ANH15JEEkF" to="">
                                            Learn More
                                        </Link>
                                    </div>
                                </Card>
                                <Card className="securityCard">
                                    <div className="securityIconContainer">
                                        <AiFillLock className="securityIcon" />
                                    </div>
                                    <div className="securityCardHeaderContainer">
                                        <p className="securityCardHeader">MULTISIG</p>
                                    </div>
                                    <div className="securityCardTextContainer">
                                        <p className="securityCardText">
                                            All contracts AND wallets will be safe behind a 5/6 Multi-sig with Gnosis Safe. We have team members, influencers and community members
                                            that participate in the multi-sig for extra safety.
                                        </p>
                                    </div>
                                    <div className="secuertyCardLinkContiner">
                                        <Link className="securityLinkText" target="https://gnosis-safe.io/" to="">
                                            Learn More
                                        </Link>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
);

export default Security;
