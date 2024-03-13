import React from "react";
import { Col, Container, Row } from "reactstrap";
import "../landingStyle.scss";
import compoundImgs from "../../../assets/BloomAssets/8.png";
import teamImgs from "../../../assets/BloomAssets/5.png";
import { Link } from "react-router-dom";

const BloomifySection = () => (
    <section className="landing_section bloomify_section" id="bloomifysection">
        <Container className="containerTechnology">
            <Row className="landingRow technologyRow">
                <Col className="technologyCol1" md={12}>
                    <div className="bloomiflyLeftLanding background">
                        <p className="glitch1">Bloomify</p>
                        <p className="main-text">
                            The Dark Forest Development group has built a sustainable rewards system, resulting in a symbiotic relationship between the community, influencers, up
                            and coming projects, and other crypto based projects. A one stop shop for marketing and passive income.
                        </p>
                        <div className="navButtons buttonLeft">
                            <Link className="buttonNav buttonWhite" to="">
                                dApp
                            </Link>
                            <a className="buttonNav buttonWhite" href="https://darkforestmoney.gitbook.io/bloom-referral-1/">
                                GitBook
                            </a>
                        </div>
                    </div>
                    <div className="bloomifyRightLanding">
                        <div className="bloomifyPoints">
                            <div className="boomifyPoints3">
                                <div className="box1">
                                    <div className=""></div>
                                    <div className="content">
                                        <h3>Deposit USDC.e into the dApp</h3>
                                    </div>
                                </div>
                                <div className="box1">
                                    <div className="icon"></div>
                                    <div className="content">
                                        <h3>Earn .5%-1% daily on your own deposit </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="boomifyPoints3">
                                <div className="box1">
                                    <div className=""></div>
                                    <div className="content">
                                        <h3>Earn MORE when you build a team</h3>
                                    </div>
                                </div>
                                <div className="box1">
                                    <div className=""></div>
                                    <div className="content">
                                        <h3>Stable coin rewards on referral's deposits AND compounds</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="boomifyPoints3">
                                <div className="box1">
                                    <div className=""></div>
                                    <div className="content">
                                        <h3>Support your team</h3>
                                    </div>
                                </div>
                                <div className="box1">
                                    <div className=""></div>
                                    <div className="content">
                                        <h3>Reward your team with Airdrops</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className="codeCol1" md={12}>
                    <div className="bloomiflyLeftLanding1">
                        <div className="dailyAprTextContainer">
                            <p className="securityCardHeader centerTextMobile">Daily APR</p>
                            <p className="smallSecurityText">PASSIVE INCOME</p>
                            <div></div>
                            <p className="securityCardText centerTextMobile">
                                You can participate in Bloomify without referring others. If this is your choice, you’ll get a stable daily APR of 0.5%.
                            </p>
                            <div></div>
                            <p className="securityCardText centerTextMobile">
                                Create a team – Minimum 5 direct referrals to earn the team wallet status. By doing this, you are rewarded with a stable daily APR of 1%.
                            </p>
                        </div>
                    </div>
                    <div className="bloomifyRightLanding1">
                        <img className="compoundImg" src={compoundImgs} />
                    </div>
                </Col>
                <Col className="codeCol1" md={12}>
                    <div className="bloomifyRightLanding1">
                        <img className="compoundImg" src={teamImgs} />
                    </div>
                    <div className="bloomiflyLeftLanding1">
                        <div className="dailyAprTextContainer">
                            <p className="securityCardHeader centerTextMobile">Team Creation</p>
                            <p className="smallSecurityText centerTextMobile">BECOME TEAM LEADER</p>
                            <div></div>
                            <p className="securityCardText centerTextMobile">
                                To "build a team", means that you begin using your referral code to invite others into the Bloomify protocol and then supporting those you refer
                                with answering questions, helping them utilize the system and assisting them in building their own teams if they choose to. Once you've reached FIVE
                                direct referrals, you become a "Team Wallet" meaning you AND your direct referrals all get a 1% apr on your deposits.
                            </p>
                            <div></div>
                            <p className="securityCardText centerTextMobile">
                                Team wallets also airdrop their teams a portion of $NCTR to both encourage and reward their team members. Building a team is a great way to earn
                                more rewards while also building a supportive community.
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
);

export default BloomifySection;
