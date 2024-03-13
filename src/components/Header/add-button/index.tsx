import { useState, useEffect } from "react";
import { Link, SvgIcon, Popper, Button, Paper, Typography, Divider, Box, Fade, Slide } from "@material-ui/core";
import { ReactComponent as InfoIcon } from "../../assets/icons/info-fill.svg";
import { ReactComponent as ArrowUpIcon } from "../../assets/icons/arrow-up.svg";
import styled from "styled-components";
import "./add-button.scss";
import { useWeb3Context } from "../../../hooks";
import ReactDOM from "react-dom";
import { getAddresses, TOKEN_DECIMALS, DEFAULD_NETWORK } from "../../../constants";
import { IReduxState } from "../../../store/slices/state.interface";
import { useSelector } from "react-redux";
import NCTRImg from "src/assets/tokens/BLOOM.png";
import "../button-styles.scss";

const addTokenToWallet = (event: any) => {
    if (window.ethereum) {
        const host = window.location.origin;
        let tokenPath;
        const nctrContract = "0x0adD05dC5eF7c622CeD36aF14cDF1ca360AEae86";
        const tokenSymbol = "NCTR";
        const tokenDecimals = 16;

        tokenPath = NCTRImg;
        const imageURL = `${host}/${tokenPath}`;

        try {
            window.ethereum.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20",
                    options: {
                        address: nctrContract,
                        symbol: tokenSymbol,
                        decimals: tokenDecimals,
                        image: imageURL,
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
};

const CustomButton = styled(Button)``;

function AddButton() {
    const [anchorEl, setAnchorEl] = useState(null);
    const isEthereumAPIAvailable = window.ethereum;
    const handleClick = (event: any) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const clickFunc = () => {
        window.open(`https://traderjoexyz.com/trade?outputCurrency=${NCTR_ADDRESS}`, "_blank");
    };

    const open = Boolean(anchorEl);

    const networkID = useSelector<IReduxState, number>(state => {
        return (state.app && state.app.networkID) || DEFAULD_NETWORK;
    });

    const addresses = getAddresses(networkID);

    const NCTR_ADDRESS = addresses.NCTR_ADDRESS;

    const tokenSymbol = "NCTR";
    const tokenDecimals = 16;
    const nctrContract = addresses.NCTR_ADDRESS;

    const id = "buttonContainerStyle";
    return (
        <Box component="div" onMouseEnter={e => handleClick(e)} onMouseLeave={e => handleClick(e)} id="nctr-menu-button-hover" className="buttonWrapperStyle">
            <div className="buttonWrapperStyle">
                <div className="">
                    <div className="">
                        <div className="headButtonStyle">$NCTR</div>
                    </div>
                </div>

                <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start" transition>
                    {({ TransitionProps }) => {
                        return (
                            <Fade {...TransitionProps} timeout={100}>
                                <Paper className="nctr-menu" elevation={1}>
                                    <Box className="add-tokens">
                                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                                            <Button className="menuButton" onClick={clickFunc}>
                                                <Typography variant="body1">Buy $NCTR</Typography>
                                            </Button>
                                        </Box>
                                    </Box>
                                    <Divider className="nctr-divider" />
                                    {isEthereumAPIAvailable ? (
                                        <Box className="add-tokens">
                                            <Box display="flex" flexDirection="row" justifyContent="space-between">
                                                <Button className="menuButton" onClick={e => addTokenToWallet(e)}>
                                                    <Typography variant="body1">Add $NCTR</Typography>
                                                </Button>
                                            </Box>
                                        </Box>
                                    ) : null}
                                </Paper>
                            </Fade>
                        );
                    }}
                </Popper>
            </div>
        </Box>
    );
}

export default AddButton;
