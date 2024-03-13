import React from "react";
import { Col, Row, Container } from "reactstrap";
import CheckIcon from "mdi-react/CheckIcon";
import jeremy from "../../../assets/team/jeremy.png";
import teammember from "../../../assets/team/teammember.png";
import damon from "../../../assets/team/damon.png";
import apex from "../../../assets/team/apex.png";
import sime from "../../../assets/team/sime.png";
import deer from "../../../assets/team/deer.png";
import trey from "../../../assets/team/trey.png";
import waylor from "../../../assets/team/waylor.png";
import { FaTwitter, FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";

const handleTwitterClick = (goTo: string) => {
    if (goTo == "jeremy") {
        window.open("https://twitter.com/ExpeditionDeFi");
    } else if (goTo == "trey") {
        window.open("https://twitter.com/Trey_Bear7");
    } else if (goTo == "damon") {
        window.open("https://twitter.com/Damon_Fieberg");
    } else if (goTo == "sime") {
        window.open("https://twitter.com/SimeCrypto");
    } else if (goTo == "deer") {
        window.open("https://twitter.com/DeeR_DF");
    } else if (goTo == "waylor") {
        window.open("https://twitter.com/");
    } else if (goTo == "apex") {
        window.open("https://twitter.com/DeFiWillBloom");
    } else if (goTo == "sad") {
        window.open("https://twitter.com/");
    } else if (goTo == "bench") {
        window.open("https://twitter.com/");
    }
};

const handleYoutubeClick = (goTo: string) => {
    if (goTo == "jeremy") {
        window.open("https://www.youtube.com/c/ExpeditionDeFi");
    } else if (goTo == "deer") {
        window.open("https://www.twitch.tv/samithedeer");
    }
};

const handleInstagramClick = (goTo: string) => {
    if (goTo == "waylor") {
        window.open("https://www.instagram.com/markkarre/");
    } else if (goTo == "damon") {
        window.open("https://www.instagram.com/damonfbg_/");
    }
};

const handleLinkedInClick = (goTo: string) => {
    if (goTo == "trey") {
        window.open("https://www.linkedin.com/");
    } else if (goTo == "apex") {
        window.open("https://www.linkedin.com/");
    } else if (goTo == "sad") {
        window.open("https://www.linkedin.com/");
    } else if (goTo == "bench") {
        window.open("https://www.linkedin.com/");
    } else if (goTo == "sime") {
        window.open("https://www.linkedin.com/");
    }
};

const Team = () => (
    <section className="landing__section">
        <Container id="team-section">
            <Row>
                <Col md={12}>
                    <div className="headingTextFix">
                        <p className="codeSmallText blueColor">MEET TEAM</p>
                        <p className="codeBigText">OUR PROFESSIONAL TEAM</p>
                        <p className="codeClassicText textFix"></p>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="teamCol" md={12}>
                    <div className="teamCardContainer">
                        <div>
                            <img className="partnerImg" src={trey} />
                        </div>
                        <div>
                            <p className="teamFont textAlign">Trey/Bear - CEO</p>
                        </div>
                        <div className="partnerLinkContaner">
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleTwitterClick("trey");
                                }}
                            >
                                <FaTwitter className="partnerLink"></FaTwitter>
                            </button>
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleLinkedInClick("trey");
                                }}
                            >
                                <FaLinkedin className="partnerLink"></FaLinkedin>
                            </button>
                        </div>
                    </div>
                    <div className="teamCardContainer">
                        <div>
                            <img className="partnerImg" src={jeremy} />
                        </div>
                        <div>
                            <p className="teamFont textAlign">Jeremy/ExpedtionDeFi - CCO</p>
                        </div>
                        <div className="partnerLinkContaner">
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleTwitterClick("jeremy");
                                }}
                            >
                                <FaTwitter className="partnerLink"></FaTwitter>
                            </button>
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleYoutubeClick("jeremy");
                                }}
                            >
                                <FaYoutube className="partnerLink"></FaYoutube>
                            </button>
                        </div>
                    </div>
                    <div className="teamCardContainer">
                        <div>
                            <img className="partnerImg" src={damon} />
                        </div>
                        <div>
                            <p className="teamFont textAlign">Damon - COM/Founder</p>
                        </div>
                        <div className="partnerLinkContaner">
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleTwitterClick("damon");
                                }}
                            >
                                <FaTwitter className="partnerLink"></FaTwitter>
                            </button>
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleInstagramClick("damon");
                                }}
                            >
                                <FaInstagram className="partnerLink"></FaInstagram>
                            </button>
                        </div>
                    </div>
                </Col>
                <Col className="teamCol" md={12}>
                    <div className="teamCardContainer">
                        <div>
                            <img className="partnerImg" src={sime} />
                        </div>
                        <div>
                            <p className="teamFont textAlign">Sime/Elk - COO</p>
                        </div>
                        <div className="partnerLinkContaner">
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleTwitterClick("sime");
                                }}
                            >
                                <FaTwitter className="partnerLink"></FaTwitter>
                            </button>
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleLinkedInClick("sime");
                                }}
                            >
                                <FaLinkedin className="partnerLink"></FaLinkedin>
                            </button>
                        </div>
                    </div>
                    <div className="teamCardContainer">
                        <div>
                            <img className="partnerImg" src={deer} />
                        </div>
                        <div>
                            <p className="teamFont textAlign">Sami/Deer - CCO</p>
                        </div>
                        <div className="partnerLinkContaner">
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleTwitterClick("deer");
                                }}
                            >
                                <FaTwitter className="partnerLink"></FaTwitter>
                            </button>
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleYoutubeClick("deer");
                                }}
                            >
                                <FaYoutube className="partnerLink"></FaYoutube>
                            </button>
                        </div>
                    </div>
                    <div className="teamCardContainer">
                        <div>
                            <img className="partnerImg" src={waylor} />
                        </div>
                        <div>
                            <p className="teamFont textAlign">Marc/0xWaylor - CMO</p>
                        </div>
                        <div className="partnerLinkContaner">
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleTwitterClick("waylor");
                                }}
                            >
                                <FaTwitter className="partnerLink"></FaTwitter>
                            </button>
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleInstagramClick("waylor");
                                }}
                            >
                                <FaInstagram className="partnerLink"></FaInstagram>
                            </button>
                        </div>
                    </div>
                </Col>
                <Col className="teamCol" md={12}>
                    <div className="teamCardContainer">
                        <div>
                            <img className="partnerImg" src={apex} />
                        </div>
                        <div>
                            <p className="teamFont textAlign">David/ApexPredator - CTO</p>
                        </div>
                        <div className="partnerLinkContaner">
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleTwitterClick("apex");
                                }}
                            >
                                <FaTwitter className="partnerLink"></FaTwitter>
                            </button>
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleLinkedInClick("apex");
                                }}
                            >
                                <FaLinkedin className="partnerLink"></FaLinkedin>
                            </button>
                        </div>
                    </div>
                    <div className="teamCardContainer">
                        <div>
                            <img className="partnerImg" src={teammember} />
                        </div>
                        <div>
                            <p className="teamFont textAlign">Dark Deer - DOM</p>
                        </div>
                        <div className="partnerLinkContaner">
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleTwitterClick("sad");
                                }}
                            >
                                <FaTwitter className="partnerLink"></FaTwitter>
                            </button>
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleLinkedInClick("sad");
                                }}
                            >
                                <FaLinkedin className="partnerLink"></FaLinkedin>
                            </button>
                        </div>
                    </div>
                    <div className="teamCardContainer">
                        <div>
                            <img className="partnerImg" src={teammember} />
                        </div>
                        <div>
                            <p className="teamFont textAlign">MR. Benchpress - ABM</p>
                        </div>
                        <div className="partnerLinkContaner">
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleTwitterClick("bench");
                                }}
                            >
                                <FaTwitter className="partnerLink"></FaTwitter>
                            </button>
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleLinkedInClick("bench");
                                }}
                            >
                                <FaLinkedin className="partnerLink"></FaLinkedin>
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <div className="codeTextContainer">
                    <p className="codeSmallText">CONNECT WITH US</p>
                    <p className="codeBigText">We'd love to hear from you as we always value the community's feedback. Please reach out to us via one of our socials</p>

                    <div className="navButtons centerButtons">
                        <a className="buttonNav widthButtons blueColor" href="https://twitter.com/BloomDeFi">
                            Twitter
                        </a>
                        <a className="buttonNav widthButtons blueColor" href="https://discord.com/invite/bloomdefi">
                            Discord
                        </a>
                    </div>
                </div>
            </Row>
        </Container>
    </section>
);

export default Team;
