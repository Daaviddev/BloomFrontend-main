import { Col, Row, Container } from "reactstrap";
import "../landingStyle.scss";
import teamImgs from "../../../assets/BloomAssets/design1.png";
import { RiTwitterLine, RiDiscordLine, RiInstagramLine } from "react-icons/ri";

import { Link } from "react-router-dom";

const handleClick = (goTo: string) => {
    if (goTo == "twitter") {
        window.open("https://twitter.com/BloomDeFi");
    } else if (goTo == "discord") {
        window.open("https://discord.com/invite/bloomdefi");
    }
};

const Header = () => (
    <div className="landing_header">
        <Container className="landingCont">
            <Row className="landingRow">
                <Col className="landingCol" md={12}>
                    <div className="bloomheadsplit">
                        <div className="bloomheadLeft">
                            <h1 className="glitch" data-glitch="Bloom">
                                Bloom
                            </h1>
                            <h2 className="subheader2">A Garden Of Wealth</h2>
                            <p className="main-text">
                                Here at BloomDeFi we are creating a grand ecosystem that everyone can call home. Investors are free to invest in a ever expanding network of
                                protocols that fall under the Bloom Ecosystem Umbrella.
                            </p>
                            <div className="navButtons buttonLeft">
                                <Link className="buttonNav blueRealBackground" to="/bloomify">
                                    Open dApp
                                </Link>
                            </div>
                        </div>
                        <div className="bloomheadRight">
                            <img className="compoundImg" src={teamImgs} />
                        </div>
                    </div>

                    <div className="socialIconsHeader">
                        <button
                            className="iconButton"
                            onClick={() => {
                                handleClick("twitter");
                            }}
                        >
                            <RiTwitterLine className="blueBackground socialIconsBlue"></RiTwitterLine>
                        </button>
                        <button
                            className="iconButton"
                            onClick={() => {
                                handleClick("discord");
                            }}
                        >
                            <RiDiscordLine className="blueBackground socialIconsBlue"></RiDiscordLine>
                        </button>
                        <RiInstagramLine className="blueBackground socialIconsBlue" href=""></RiInstagramLine>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
);

export default Header;
