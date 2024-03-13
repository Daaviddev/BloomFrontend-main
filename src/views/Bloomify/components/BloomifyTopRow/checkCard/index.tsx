import { Card, CardBody, Col } from "reactstrap";
import "../../../../TeamManagement/teamManagement.scss";
import "../../../bloomify.scss";
import BloomButton from "../../bloomButton";
import React, { useEffect, useState } from "react";
import { useWeb3Context } from "src/hooks";
import { bloomifyCheckPlayer, IBloomifyPlayer } from "src/store/slices/bloomify-thunk";
import { sleep, trim } from "src/helpers";

const CheckCard = () => {
    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();
    const [wallet, setWallet] = useState<string>("");
    const [teamMembers, setTeamMembers] = useState<string>("0");
    const [airdropsSent, setAirdropsSent] = useState<string>("0");

    const handleChangeValue = (value: any) => {
        setWallet(value);
    };

    let Player;

    const handleClick = async () => {
        if (await checkWrongNetwork()) {
            return;
        } else {
            if (wallet != "") {
                Player = await bloomifyCheckPlayer(wallet, provider, address, chainID);
                if (Player != undefined) {
                    setTeamMembers(Player.userDownilnesCount);
                    setAirdropsSent(trim(Number(Player.airdropsGiven) / Math.pow(10, 18), 2));
                }
            }
        }
    };

    return (
        <Col className="teammanagementCol33 addMargins colheight" md={12} xl={3} lg={6} xs={12}>
            <Card className="teamCard1 cardheight">
                <CardBody className="infoCardBody cardBody3">
                    <div className="contentWrapper">
                        <div className="headerWrapper">
                            <span className="headerText">CHECK OUT BLOOMER</span>
                        </div>
                        <div className="depositWrapper">
                            <div className="labelWrapper">
                                <label className="depositLabel subheadText">BLOOMER: </label>
                            </div>
                            <input className="input5 getDownlineWallet" type="text" onChange={value => handleChangeValue(value.target.value ? value.target.value : "")} />
                        </div>
                        <div className="tableWrapper">
                            <div className="rowWrapper">
                                <p className="subheadText">Downline Size</p>
                                <p className="subheadText">{teamMembers}</p>
                            </div>
                            <div className="rowWrapper">
                                <p className="subheadText">Airdrops Sent </p>
                                <p className="subheadText">{airdropsSent} $NCTR</p>
                            </div>
                        </div>
                        <div className="buttonWrapper">
                            <div
                                className="buttonContainer"
                                onClick={async () => {
                                    await handleClick();
                                    await sleep(10);
                                }}
                            >
                                <BloomButton action="check" actionTime={0} />
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default CheckCard;
