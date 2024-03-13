import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardBody, Col } from "reactstrap";
import "../../../../TeamManagement/teamManagement.scss";
import { Skeleton } from "@material-ui/lab";
import "../../../bloomify.scss";
import BloomButton from "../../bloomButton";
import { useDispatch, useSelector } from "react-redux";
import { IReduxState } from "../../../../../store/slices/state.interface";
import { IAppSlice } from "../../../../../store/slices/app-slice";
import { IAccountSlice } from "../../../../../store/slices/account-slice";
import CreatableSelect from "react-select/creatable";
import { useWeb3Context } from "src/hooks";
import { sleep } from "src/helpers";
import { approveBloomify, bloomifyDeposit, setUsdceWallet } from "../../../../../store/slices/bloomify-thunk";
import { useParams } from "react-router-dom";
import { over } from "lodash";

const roles = [
    { id: 0, value: "0xb0Cbb564f3239C230906301Fe20f3f9a9C65f57F", label: "Expedition DeFi", link: "ExpeditionDeFi" },
    { id: 1, value: "0x701684dc47505EBC7a1FC5665B206F74eA8e4ceC", label: "Channel 4 News Team", link: "CH4NT" },
    { id: 2, value: "0x9581d33d596D740Be3B2394a05489c79ae46B585", label: "Bloomyfans", link: "BloomyFans" },
    { id: 3, value: "0xEB755b81A786832705a3c0658127216eD36fE898", label: "Grape", link: "Grape" },
    { id: 4, value: "0x8e3e54Cfae5dbD350c960E9102e1867C522A4b3d", label: "Horde", link: "Horde" },
    { id: 5, value: "0x5aca27AEe06a4ac9c839415271Bbc4558f8b7679", label: "Pelton", link: "Pelton" },
    { id: 6, value: "0x39171BD5Ce890A4dfa464299c5489c261fF28fe7", label: "LiquidCapital", link: "LC" },
    { id: 7, value: "0xA8176b3F8f6Acc86494A3674Dd87DB5314cA2193", label: "CW CommunityWallet", link: "CW" },
    { id: 8, value: "0x0bDDc4Bb9732F97E204f16abB19aA7fcCbc0832B", label: "CVB CryptoVerse", link: "CVB" },
    { id: 9, value: "0xEC97eC2918F6c9A7586C008536a7BE7ed996C5c7", label: "BMB BigMoose", link: "BMB" },
    { id: 10, value: "0x269ED16B66fE6a32b0d63C56EAf51e7377C9cAb9", label: "BlockChainBabes", link: "BBabes" },
    { id: 11, value: "0x563E8425fB2aA879BbE29805745833c13cf4Bd8A", label: "Austin Clark", link: "AustinClark" },
    { id: 12, value: "0xAc7B32f010a01231C6f081919169BD0cAa031724", label: "Exy", link: "Exy" },
    { id: 13, value: "0xd9c6b4d5253edb3675d4377fe676552bc7d704d7", label: "JakeCrypto", link: "JakeCrypto" },
    { id: 14, value: "0x95CF5354519a6ad2bD7e53fe7763201dfB24bFE4", label: "Test", link: "JakeCrypto" },
];

const rolesAll = [
    { id: 0, value: "0xb0Cbb564f3239C230906301Fe20f3f9a9C65f57F", label: "Expedition DeFi", link: "ExpeditionDeFi" },
    { id: 1, value: "0x701684dc47505EBC7a1FC5665B206F74eA8e4ceC", label: "Channel 4 News Team", link: "CH4NT" },
    { id: 2, value: "0x9581d33d596D740Be3B2394a05489c79ae46B585", label: "Bloomyfans", link: "BloomyFans" },
    { id: 3, value: "0xEB755b81A786832705a3c0658127216eD36fE898", label: "Grape", link: "Grape" },
    { id: 4, value: "0x8e3e54Cfae5dbD350c960E9102e1867C522A4b3d", label: "Horde", link: "Horde" },
    { id: 5, value: "0x5aca27AEe06a4ac9c839415271Bbc4558f8b7679", label: "Pelton", link: "Pelton" },
    { id: 6, value: "0x39171BD5Ce890A4dfa464299c5489c261fF28fe7", label: "LiquidCapital", link: "LC" },
    { id: 7, value: "0xA8176b3F8f6Acc86494A3674Dd87DB5314cA2193", label: "CW CommunityWallet", link: "CW" },
    { id: 8, value: "0x0bDDc4Bb9732F97E204f16abB19aA7fcCbc0832B", label: "CVB CryptoVerse", link: "CVB" },
    { id: 9, value: "0xEC97eC2918F6c9A7586C008536a7BE7ed996C5c7", label: "BMB BigMoose", link: "BMB" },
    { id: 10, value: "0x269ED16B66fE6a32b0d63C56EAf51e7377C9cAb9", label: "BlockChainBabes", link: "BBabes" },
    { id: 11, value: "0x563E8425fB2aA879BbE29805745833c13cf4Bd8A", label: "Austin Clark", link: "AustinClark" },
    { id: 12, value: "0xAc7B32f010a01231C6f081919169BD0cAa031724", label: "Exy", link: "Exy" },
    { id: 13, value: "0xd9c6b4d5253edb3675d4377fe676552bc7d704d7", label: "JakeCrypto", link: "JakeCrypto" },
    { id: 14, value: "0x07d475C841F62731e039ca3C18D423fB38c6A0Dd", label: "BloomTown", link: "BloomTown" },
    { id: 15, value: "0x81cac0caf415Bf21ff3A05b0dA59C4Bc0f86f5F4", label: "CryptoBullDog", link: "CryptoBullDog" },
    { id: 16, value: "0xdffEC9AFFf738A6440619C819E1f5da0627007F5", label: "CryptoPhill", link: "CryptoPhill" },
    { id: 17, value: "0x97B86ce964369cD77835e7F34CE9078cDb76A7e7", label: "CryptoJake", link: "CryptoJake" },
    { id: 18, value: "0xD3d996b3148eD4c3b2D39A71764A75286354b835", label: "MattBills", link: "MattBills" },
    { id: 19, value: "0x55fa7e655c2b0AB5a465fD95D1840262EC1a5a23", label: "DoritoCrypt", link: "DoritoCrypt" },
    { id: 20, value: "0x5707e36ef8841eC33C439B0C3C354946abD2B554", label: "DeFiDork", link: "DeFiDork" },
    { id: 21, value: "0xb0a5833D0040596BcEeCBfe06e2Bf29DD3A2C60D", label: "SelectedInvestments", link: "SelectedInvestments" },
];

const DepositCard = () => {
    const { id }: { id: string } = useParams();

    const accountBalance = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.usdce;
    });

    const [roleValue, setRoleValue] = useState<string>("");
    const [upline, setUpline] = useState<string>("");
    const [inList, setInList] = useState<number>(0);
    const [selectedId, setSelectedId] = useState<number>(0);

    if (upline == "") {
        const links = rolesAll.find(obj => {
            return obj.link === id;
        });

        if (links != undefined) {
            setUpline(links.value);
            setSelectedId(links.id);
        } else {
            setUpline("0");
            setSelectedId(-1);
        }
    }

    const isBloomifyApproved = useSelector<IReduxState, boolean>(state => {
        return state.account.approvals && state.account.approvals.isBloomifyApproved;
    });

    let isBloomifyUsdcApproved = false;

    let usdceBalance = "";

    if (accountBalance != null) {
        usdceBalance = accountBalance.toString();
    }

    if (isBloomifyApproved != null) {
        isBloomifyUsdcApproved = isBloomifyApproved;
    }

    let acountBalance = parseInt(usdceBalance, 10);

    const customStyles = {
        control: (base: any, state: any) => ({
            ...base,
            display: "flex",

            backgroundColor: "#333 !important",
            color: "white",
            // match with the menu
            borderRadius: "3px 3px 0 0",
            // Overwrittes the different states of border
        }),
        menu: (base: any) => ({
            ...base,
            // override border radius to match the box
            borderRadius: 0,
            backgroundColor: "#333",
            // kill the gap
            marginTop: 0,
            color: "white",
        }),

        menuList: (base: any) => ({
            ...base,
            backgroundColor: "#333",
            // kill the white space on first and last option
            padding: 0,
            color: "white",
        }),

        option: (base: any) => ({
            ...base,
            color: "white",
            backgroundColor: "#333",

            // kill the white space on first and last option
            padding: "5%",
            "&:hover": {
                // Overwrittes the different states of border
                backgroundColor: "#7611f7",
            },
        }),
        valueContainer: (base: any) => ({
            ...base,
            color: "white",

            // kill the white space on first and last option
        }),
        value: (base: any) => ({
            ...base,
            color: "white",

            // kill the white space on first and last option
        }),
        singleValue: (base: any) => ({
            ...base,
            color: "white",

            // kill the white space on first and last option
        }),
        input: (base: any) => ({
            ...base,
            color: "white",
            boxShadow: "none",
            border: "0%",

            // kill the white space on first and last option
        }),
    };

    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState<number>(0);

    const handleChange = (field: any, value: any) => {
        switch (field) {
            case "roles":
                if (value == null) {
                    break;
                } else {
                    setRoleValue(value);
                    setUpline(value.value);
                    break;
                }

            default:
                break;
        }
    };

    const handleInputChange = (inputValue: any, actionMeta: any) => {
        console.groupEnd();
    };

    const handleClick = async () => {
        if (await checkWrongNetwork()) {
            return;
        } else {
            if (upline != "" && quantity != 0 && isBloomifyUsdcApproved) {
                dispatch(bloomifyDeposit({ upline, quantity, provider, address, networkID: chainID }));
            }
        }
    };

    const handleChangeValue = (value: any) => {
        setQuantity(value);
        return "";
    };

    const maxClickEvent = () => {
        setQuantity(acountBalance);
        return "";
    };

    const getActionTime = () => {
        const actionTime = 1;
        return actionTime <= 0 ? 0 : actionTime;
    };

    const getTimeLeft = () => {
        const timestamp = getActionTime() - Math.floor(Date.now() / 1000);
        return timestamp <= 0 ? 0 : timestamp;
    };

    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    useEffect(() => {
        let timer = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    });

    return (
        <Col className="teammanagementCol33 addMargins colheight" md={12} xl={3} lg={6} xs={12}>
            <Card className="teamCard1 cardheight">
                <CardBody className="infoCardBody cardBody3">
                    <div className="contentWrapper">
                        <div>
                            <div className="headerWrapper">
                                <span className="headerText">DEPOSIT</span>
                            </div>
                        </div>
                        <div className="depositWrapper">
                            <div className="labelWrapper">
                                <label className="depositLabel subheadText">VALUE: </label>
                                <label className="depositLabel subheadText">USDC.e : {accountBalance} </label>
                            </div>
                            <div className="setFlex1 sto">
                                <input
                                    className="getDownlineWallet osm input1"
                                    type="number"
                                    value={quantity}
                                    name="name"
                                    onChange={value => handleChangeValue(value.target.value ? value.target.value : "")}
                                />
                                <input className="getDownlineWallet dvs" type="submit" value="Max" onClick={maxClickEvent} />
                            </div>
                        </div>
                        <div className="depositWrapper">
                            <div className="labelWrapper">
                                <label className="depositLabel subheadText">BLOOMER </label>{" "}
                            </div>
                            {selectedId >= 0 ? (
                                <CreatableSelect
                                    isClearable
                                    onChange={value => handleChange("roles", value ? value : "")}
                                    onInputChange={value => handleInputChange("roles", value)}
                                    options={roles}
                                    value={roleValue}
                                    className="widthfull"
                                    //theme={customStyles}
                                    menuPortalTarget={document.body}
                                    defaultInputValue={rolesAll[selectedId].label}
                                    styles={customStyles}
                                />
                            ) : (
                                <CreatableSelect
                                    isClearable
                                    onChange={value => handleChange("roles", value ? value : "")}
                                    onInputChange={value => handleInputChange("roles", value)}
                                    options={roles}
                                    value={roleValue}
                                    className="widthfull"
                                    // theme={customStyles}
                                    menuPortalTarget={document.body}
                                    styles={customStyles}
                                />
                            )}
                        </div>{" "}
                        <div className="buttonWrapper">
                            <div
                                className="buttonContainer"
                                onClick={async () => {
                                    await handleClick();
                                    await sleep(10);
                                }}
                            >
                                {isBloomifyUsdcApproved ? <BloomButton action="deposit" actionTime={0} /> : <BloomButton action="approve" actionTime={0} />}
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default DepositCard;
