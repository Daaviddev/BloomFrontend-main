import React from "react";
import { Col, Row, Container } from "reactstrap";
import jeremy from "../../../assets/partners/jeremy.png";
import jamespelton from "../../../assets/partners/jamespelton.png";
import cryptoverse from "../../../assets/partners/cryptoverse.png";
import blockchainbabes from "../../../assets/partners/blockchainbabes.png";
import horde from "../../../assets/partners/horde.png";
import bigmoose from "../../../assets/partners/bigmoose.png";
import jakecrypto from "../../../assets/partners/jakecrypto.png";
import exy from "../../../assets/partners/exy.png";
import mystery from "../../../assets/team/9.png";
import cw from "../../../assets/team/cw.png";
import ch4 from "../../../assets/team/ch4.png";
import grape from "../../../assets/team/grape.png";
import lc from "../../../assets/team/lc.png";

import { FaTwitter, FaYoutube, FaDiscord } from "react-icons/fa";

const handleTwitterClick = (goTo: string) => {
    if (goTo == "jeremy") {
        window.open("https://twitter.com/BloomDeFi");
    } else if (goTo == "jamespelton") {
        window.open("https://twitter.com/JamesPelton18");
    } else if (goTo == "cryptoverse") {
        window.open("https://twitter.com/cryptoverse73");
    } else if (goTo == "blockchainbabes") {
        window.open("https://twitter.com/blckchainbabes");
    } else if (goTo == "horde") {
        window.open("https://twitter.com/HordeTweets");
    } else if (goTo == "bigmoose") {
        window.open("https://twitter.com/BigMooseCrypto");
    } else if (goTo == "jakecrypto") {
        window.open("https://twitter.com/TheJakeCrypto");
    } else if (goTo == "exy") {
        window.open("https://twitter.com/Exy_Crypto");
    } else if (goTo == "cw") {
        window.open("https://twitter.com/bloomcw");
    } else if (goTo == "ch4") {
        window.open("");
    } else if (goTo == "lc") {
        window.open("https://twitter.com/lqd_capital");
    } else if (goTo == "grape") {
        window.open("https://twitter.com/grape_finance");
    }
};

const handleYoutubeClick = (goTo: string) => {
    if (goTo == "jeremy") {
        window.open("https://www.youtube.com/c/ExpeditionDeFi");
    } else if (goTo == "jamespelton") {
        window.open("https://www.youtube.com/c/JamesPelton");
    } else if (goTo == "jakecrypto") {
        window.open("https://www.youtube.com/c/JakeCrypto");
    }
};

const handleDiscordClick = (goTo: string) => {
    if (goTo == "blockchainbabes") {
        window.open("https://discord.com/invite/5n54fBQUmq");
    } else if (goTo == "horde") {
        window.open("https://discord.com/invite/horde");
    } else if (goTo == "cryptoverse") {
        window.open("https://discord.gg/dgSFuYb4WV");
    } else if (goTo == "cw") {
        window.open("https://discord.gg/7Dtw9mSFB8");
    } else if (goTo == "grape") {
        window.open("https://discord.com/invite/mZ4QrZwH5M");
    } else if (goTo == "lc") {
        window.open("https://discord.com/invite/EdJZNwWkg");
    }
};

const Partners = () => (
    <section className="landing__section">
        <Container id="partner-section">
            <Row>
                <Col md={12}>
                    <div className="headingTextFix">
                        <p className="codeSmallText blueColor">OFFICIAL PARTNERS</p>
                        <p className="codeBigText ">OFFICIAL PARTNERS</p>
                        <p className="codeClassicText textFix">
                            We have partnered with several well recognized influencers, communities and projects as possible that will all assist in the promotion of our ecosystem
                            along with serving at their discretion as an "Advisory Board" to the project to ensure all voices are represented and that they can help hold the team
                            accountable for decisions and additions to the ecosystem. Here are our current partners:
                        </p>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="teamCol" md={12}>
                    <div className="partnershipCardContainer ">
                        <div>
                            <img className="partnerImg" src={jeremy} />
                        </div>
                        <div>
                            <p className="teamFont textAlign">ExpeditionDeFi</p>
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
                    <div className="partnershipCardContainer ">
                        <div>
                            <img className="partnerImg" src={jamespelton} />
                        </div>
                        <div>
                            <p className="teamFont textAlign">James Pelton</p>
                        </div>
                        <div className="partnerLinkContaner">
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleTwitterClick("jamespelton");
                                }}
                            >
                                <FaTwitter className="partnerLink"></FaTwitter>
                            </button>
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleYoutubeClick("jamespelton");
                                }}
                            >
                                <FaYoutube className="partnerLink"></FaYoutube>
                            </button>
                        </div>
                    </div>
                    <div className="partnershipCardContainer ">
                        <div>
                            <img className="partnerImg" src={cryptoverse} />
                        </div>
                        <div>
                            <p className="teamFont textAlign">CryptoVerse</p>
                        </div>
                        <div className="partnerLinkContaner">
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleTwitterClick("cryptoverse");
                                }}
                            >
                                <FaTwitter className="partnerLink"></FaTwitter>
                            </button>
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleDiscordClick("cryptoverse");
                                }}
                            >
                                <FaDiscord className="partnerLink"></FaDiscord>
                            </button>
                        </div>
                    </div>
                    <div className="partnershipCardContainer ">
                        <div>
                            <img className="partnerImg" src={blockchainbabes} />
                        </div>
                        <div>
                            <p className="teamFont textAlign">BlockChain Babes</p>
                        </div>
                        <div className="partnerLinkContaner">
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleTwitterClick("blockchainbabes");
                                }}
                            >
                                <FaTwitter className="partnerLink"></FaTwitter>
                            </button>
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleDiscordClick("blockchainbabes");
                                }}
                            >
                                <FaDiscord className="partnerLink"></FaDiscord>
                            </button>
                        </div>
                    </div>
                </Col>
                <Col className="teamCol" md={12}>
                    <div className="partnershipCardContainer ">
                        <div>
                            <img className="partnerImg" src={horde} />
                        </div>
                        <div>
                            <p className="teamFont textAlign">HORDE</p>
                        </div>
                        <div className="partnerLinkContaner">
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleTwitterClick("horde");
                                }}
                            >
                                <FaTwitter className="partnerLink"></FaTwitter>
                            </button>
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleDiscordClick("horde");
                                }}
                            >
                                <FaDiscord className="partnerLink"></FaDiscord>
                            </button>
                        </div>
                    </div>
                    <div className="partnershipCardContainer ">
                        <div>
                            <img className="partnerImg" src={bigmoose} />
                        </div>
                        <div>
                            <p className="teamFont textAlign">BigMoose</p>
                        </div>
                        <div className="partnerLinkContaner">
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleTwitterClick("bigmoose");
                                }}
                            >
                                <FaTwitter className="partnerLink"></FaTwitter>
                            </button>
                        </div>
                    </div>
                    <div className="partnershipCardContainer ">
                        <div>
                            <img className="partnerImg" src={jakecrypto} />
                        </div>
                        <div>
                            <p className="teamFont textAlign">Jake Crypto</p>
                        </div>
                        <div className="partnerLinkContaner">
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleTwitterClick("jakecrypto");
                                }}
                            >
                                <FaTwitter className="partnerLink"></FaTwitter>
                            </button>
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleYoutubeClick("jakecrypto");
                                }}
                            >
                                <FaYoutube className="partnerLink"></FaYoutube>
                            </button>
                        </div>
                    </div>
                    <div className="partnershipCardContainer ">
                        <div>
                            <img className="partnerImg" src={exy} />
                        </div>
                        <div>
                            <p className="teamFont textAlign">Exy</p>
                        </div>
                        <div className="partnerLinkContaner">
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleTwitterClick("exy");
                                }}
                            >
                                <FaTwitter className="partnerLink"></FaTwitter>
                            </button>
                        </div>
                    </div>
                </Col>
                <Col className="teamCol" md={12}>
                    <div className="partnershipCardContainer ">
                        <div>
                            <img className="partnerImg" src={ch4} />
                        </div>
                        <div>
                            <p className="teamFont textAlign">CHANNEL 4 NEWS TEAM</p>
                        </div>
                        <div className="partnerLinkContaner">
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleTwitterClick("");
                                }}
                            >
                                <FaTwitter className="partnerLink"></FaTwitter>
                            </button>
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleDiscordClick("");
                                }}
                            >
                                <FaDiscord className="partnerLink"></FaDiscord>
                            </button>
                        </div>
                    </div>
                    <div className="partnershipCardContainer ">
                        <div>
                            <img className="partnerImg" src={cw} />
                        </div>
                        <div>
                            <p className="teamFont textAlign">BLOOM CW</p>
                        </div>
                        <div className="partnerLinkContaner">
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleTwitterClick("cw");
                                }}
                            >
                                <FaTwitter className="partnerLink"></FaTwitter>
                            </button>
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleDiscordClick("cw");
                                }}
                            >
                                <FaDiscord className="partnerLink"></FaDiscord>
                            </button>
                        </div>
                    </div>
                    <div className="partnershipCardContainer ">
                        <div>
                            <img className="partnerImg" src={grape} />
                        </div>
                        <div>
                            <p className="teamFont textAlign">GRAPE FINANCE</p>
                        </div>
                        <div className="partnerLinkContaner">
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleTwitterClick("grape");
                                }}
                            >
                                <FaTwitter className="partnerLink"></FaTwitter>
                            </button>
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleDiscordClick("grape");
                                }}
                            >
                                <FaDiscord className="partnerLink"></FaDiscord>
                            </button>
                        </div>
                    </div>
                    <div className="partnershipCardContainer ">
                        <div>
                            <img className="partnerImg" src={lc} />
                        </div>
                        <div>
                            <p className="teamFont textAlign">LIQUID CAPITAL</p>
                        </div>
                        <div className="partnerLinkContaner">
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleTwitterClick("lc");
                                }}
                            >
                                <FaTwitter className="partnerLink"></FaTwitter>
                            </button>
                            <button
                                className="iconButton"
                                onClick={() => {
                                    handleDiscordClick("lc");
                                }}
                            >
                                <FaDiscord className="partnerLink"></FaDiscord>
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
);

export default Partners;
