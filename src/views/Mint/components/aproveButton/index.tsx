import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonToolbar } from "reactstrap";
import { useWeb3Context } from "../../../../hooks";
import { IApproveUSDCe } from "../../../../store/slices/mint-thunk";
import { mintBloomify, approveUSDCe } from "../../../../store/slices/mint-thunk";
import { shorten, sleep, trim } from "../../../../helpers";

function ApproveButton() {
    const [open, setOpen] = useState(false);
    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();
    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let onApprove = async () => {
        if (await checkWrongNetwork()) {
            return;
        } else {
            dispatch(approveUSDCe({ provider, address, networkID: chainID }));
        }
    };

    const buttonText = "Approve";

    return (
        <>
            <ButtonToolbar className="button-toolbar">
                <Button
                    className="buttonStyle"
                    color="primary"
                    type="submit"
                    onClick={async () => {
                        await onApprove();
                        await sleep(10);
                    }}
                >
                    {buttonText}
                </Button>
            </ButtonToolbar>
        </>
    );
}
export default ApproveButton;
