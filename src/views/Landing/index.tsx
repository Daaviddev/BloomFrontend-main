import React from "react";
import { Col, Row, Container } from "reactstrap";
import { Element } from "react-scroll";
import Header from "./components/Header";
import About from "./components/About";
import Team from "./components/Team";
import Footer from "./components/Footer";
import Partners from "./components/Partners";
import Security from "./components/Security";
import BloomifySection from "./components/BloomifySection";
import "./landingStyle.scss";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

function Landing() {
    return (
        <div className="landing">
            <div className="landing__menu">
                <Container>
                    <Row>
                        <div className="header-wrapper">
                            <div className="main-logo">
                                <a href="#">
                                    <img className="mainLogo" src={Logo}></img>
                                </a>
                            </div>
                            <nav className="nav-menu">
                                <ul className="main-menu">
                                    <li className="menu-link">
                                        <HashLink className="aLink" smooth to="#about-section">
                                            About
                                        </HashLink>
                                    </li>
                                    <li className="menu-link">
                                        <HashLink className="aLink" smooth to="#project-section">
                                            Projects
                                        </HashLink>
                                    </li>
                                    <li className="menu-link">
                                        <HashLink className="aLink" smooth to="#security-section">
                                            Security
                                        </HashLink>
                                    </li>
                                    <li className="menu-link">
                                        <HashLink className="aLink" smooth to="#partners-section">
                                            Partners
                                        </HashLink>
                                    </li>
                                    <li className="menu-link">
                                        <HashLink className="aLink" smooth to="#team-section">
                                            Team
                                        </HashLink>
                                    </li>
                                </ul>{" "}
                                <div className="navButtons">
                                    <a className="buttonNav blueBackground" href="https://twitter.com/BloomDeFi">
                                        Twitter
                                    </a>
                                    <Link className="buttonNav blueBackground" to="/bloomify">
                                        dApp
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    </Row>
                </Container>
            </div>
            <div className="headerSection">
                <Header />
            </div>
            <About />
            <Security />
            <Partners />
            <BloomifySection />
            <Team />
            <Footer />
        </div>
    );
}

export default Landing;
