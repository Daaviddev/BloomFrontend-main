import React from "react";
import { Col, Container, Row, Card, CardBody } from "reactstrap";
import MintButton from "../mintButtons";
import tier0 from "../../../../assets/bloomNFT/tier1.png";
import tier1 from "../../../../assets/bloomNFT/tier1.png";
import tier2 from "../../../../assets/bloomNFT/tier2.png";
import tier3 from "../../../../assets/bloomNFT/tier3.png";
import tier4 from "../../../../assets/bloomNFT/tier4.png";
import tier5 from "../../../../assets/bloomNFT/tier5.png";
import tier6 from "../../../../assets/bloomNFT/tier6.png";
import tier7 from "../../../../assets/bloomNFT/tier7.png";
import tier8 from "../../../../assets/bloomNFT/tier8.png";
import tier9 from "../../../../assets/bloomNFT/tier9.png";
import tier10 from "../../../../assets/bloomNFT/tier10.png";
import tier11 from "../../../../assets/bloomNFT/tier11.png";
import tier12 from "../../../../assets/bloomNFT/tier12.png";
import tier13 from "../../../../assets/bloomNFT/tier13.png";
import tier14 from "../../../../assets/bloomNFT/tier14.png";
import tier15 from "../../../../assets/bloomNFT/tier15.png";
const tierImg = [tier0, tier2, tier3, tier4, tier5, tier6, tier7, tier8, tier9, tier10, tier11, tier12, tier13, tier14, tier15];
import { useSelector } from "react-redux";
import { IReduxState } from "../../../../store/slices/state.interface";
import { IAccountSlice } from "../../../../store/slices/account-slice";
import { INFTBalance } from "../../../..//store/slices/account-slice";
import ApproveButton from "../../components/aproveButton";
import "./mintBloom.scss";

import { IApprovals } from "../../../../store/slices/account-slice";

interface IMintBloomProps {
    nftName: string;
}

function MintBloom({ nftName }: IMintBloomProps) {
    const account = useSelector<IReduxState, IAccountSlice>(state => state.account);

    const accountBalance = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.usdce;
    });

    let usdceBalance = "";

    if (accountBalance != null) {
        usdceBalance = accountBalance.toString();
    }

    let nftBalance = useSelector<IReduxState, INFTBalance>(state => {
        return state.account.nftBalances && state.account.nftBalances;
    });

    let tirr = 0;

    if (nftBalance == null) {
        tirr = 0;
    } else {
        tirr = nftBalance.nftTier;
    }

    let shouldMint = tirr < 1;
    let buttonText = "mint";

    if (!shouldMint && nftName == "bloom") {
        buttonText = "upgrade";
    } else if (nftName == "mintingClosed") {
        buttonText = "mintingClosed";
    }

    let approvals = useSelector<IReduxState, IApprovals>(state => {
        return state.account.approvals && state.account.approvals;
    });

    let isApproved = false;

    if (approvals != null) {
        isApproved = approvals.isUsdcApproved;
    }

    let price = 50;

    if (!shouldMint && nftName == "bloom") {
        price = 200;
    }

    let stringPrice = price.toString();

    const nextTier = tirr + 1;

    let imgTier = 0;

    if (tirr > imgTier) {
        imgTier = tirr;
    }

    let stringTier = "content" + tirr;

    return (
        <>
            <Card className="tierCard">
                <CardBody className="cardBodyBlur">
                    <div className={stringTier}>
                        <h3 className="page-title centerText">BLOOMIFY NFT</h3>
                        <img className="tier-image" src={tierImg[imgTier - 1]} />
                        <div className="tableWrapper">
                            <div className="rowWrapper">
                                <p className="subheadText">Current Tier</p>
                                <p className="subheadText">{tirr}</p>
                            </div>
                            <div className="rowWrapper">
                                <p className="subheadText">Depth Available </p>
                                <p className="subheadText">0/15</p>
                            </div>
                            <div className="rowWrapper">
                                <p className="subheadText">Downlines Accessible</p>
                                <p className="subheadText">{tirr}/15</p>
                            </div>
                            <div className="rowWrapper">
                                <p className="subheadText">Upgrade Price</p>
                                <p className="subheadText">{stringPrice} USDC.e</p>
                            </div>
                        </div>
                        <div className="buttonWrapper buttonTopPadding">
                            {" "}
                            <div className="">
                                <p className="subheadText">BALANCE : {usdceBalance} USDC.e </p>
                            </div>
                            {nextTier > 15 ? (
                                ""
                            ) : (
                                <div className="buttonContainer">{isApproved ? <MintButton action={buttonText} nft={nftName} nftTier={nextTier} /> : <ApproveButton />}</div>
                            )}
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default MintBloom;
