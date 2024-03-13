import React from "react";
import { Col, Container, Row, Card, CardBody } from "reactstrap";
import MintButton from "../mintButtons";
import t1 from "../../../../assets/bloomNFT/1.png";
import t2 from "../../../../assets/bloomNFT/2.png";
import t3 from "../../../../assets/bloomNFT/3.png";
import t4 from "../../../../assets/bloomNFT/4.png";
import t5 from "../../../../assets/bloomNFT/5.png";
import t6 from "../../../../assets/bloomNFT/6.png";
import deer1 from "../../../../assets/deerNFT/DeerNft.png";
const tierImg = [t1, t2, t3, t4, t5, t6];

function MintDeer() {
    const tier = 3;

    return (
        <>
            <Card className="nodetiercontanern">
                <CardBody className="infoCardBody">
                    <h3 className="page-title mintTitle">Deer NFT</h3>
                    <img className="fly-image" src={deer1} />
                    <div className="tableWrapper">
                        <div className="rowWrapper">
                            <p className="subheadText">Minted</p>
                            <p className="subheadText">0/1000</p>
                        </div>
                        <div className="rowWrapper">
                            <p className="subheadText">Current Batch </p>
                            <p className="subheadText">4/5</p>
                        </div>
                        <div className="rowWrapper">
                            <p className="subheadText">Price </p>
                            <p className="subheadText">7 AVAX</p>
                        </div>
                        <div className="rowWrapper">
                            <p className="subheadText">Predator Found</p>
                            <p className="subheadText">NO</p>
                        </div>
                    </div>
                    <div className="buttonWrapper">
                        <div className="buttonContainer">
                            <MintButton action="mint" nft="deer" nftTier={tier}></MintButton>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default MintDeer;
