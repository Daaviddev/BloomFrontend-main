import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonToolbar } from "reactstrap";
import { useWeb3Context } from "../../../../hooks";
import { mintBloomify } from "../../../../store/slices/mint-thunk";
import "./mintButton.scss";
import { sleep } from "../../../../helpers";

interface IMintButtonProps {
    action: string;
    nft: string;
    nftTier: number;
}

function MintButton({ action, nft, nftTier }: IMintButtonProps) {
    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();
    const dispatch = useDispatch();

    let buttonText = "";
    let className = "bloom-button";
    let id = nftTier;

    let onMint = async () => {
        if (await checkWrongNetwork()) {
            return;
        } else {
            if (nft == "bloom") {
                dispatch(mintBloomify({ nft, id, provider, address, networkID: chainID }));
            }
        }
    };

    if (action == "mint") {
        buttonText = "MINT";
        className = "bloom-button";
    } else if (action == "upgrade") {
        buttonText = "Upgrade";
        className = "bloom-button";
    } else if (action == "mintingClosed") {
        buttonText = "Mint";
        className = "bloom-button";
    }

    return (
        <>
            <ButtonToolbar className="button-toolbar">
                <Button
                    className="buttonStyle"
                    color="primary"
                    type="submit"
                    onClick={async () => {
                        await onMint();
                        await sleep(10);
                    }}
                >
                    {buttonText}
                </Button>
            </ButtonToolbar>
        </>
    );
}
export default MintButton;
