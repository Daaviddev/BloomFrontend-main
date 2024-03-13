import { BigNumber, ethers, utils } from "ethers";
import { getAddresses } from "../../constants";
import { ApeuManagerContract, BloomexContract, BloomsManager, USDCeContract, NCTRContract, LMSAbi } from "../../abi";
import { clearPendingTxn, fetchPendingTxns } from "./pending-txns-slice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Networks } from "../../constants/blockchain";
import { warning, success, info, error } from "./messages-slice";
import { messages } from "../../constants/messages";
import { getGasPrice } from "../../helpers/get-gas-price";
import { metamaskErrorWrap } from "../../helpers/metamask-error-wrap";
import { sleep } from "../../helpers";

export const getNCTRamount = async (nctrSwap: any, amountIn: any, wallet: any, provider: any, networkID: any) => {
    const value = ethers.utils.parseUnits(amountIn, 18);

    let amounts = await bloomexAmountsOut(nctrSwap, value, wallet, provider, networkID);

    const amount = amounts.amountOut;

    return amount;
};

export interface IGetAmountsIn {
    amountIn: string;
    amountOut: string;
}

export const bloomexAmountsIn = async (amountOut: any, provider: any, address: any, networkID: any) => {
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();

    let path = [addresses.USDCe_ADDRESS, addresses.NCTR_ADDRESS];
    const bloomexRouter = new ethers.Contract(addresses.BLOOMEX_ROUTER_ADDRESS, BloomexContract, signer);

    //get approval for nft

    const amountsIn = await bloomexRouter.getAmountsIn(amountOut, path);

    const Bloomer: IGetAmountsIn = {
        amountIn: ethers.utils.formatUnits(amountsIn[0], "ether"),
        amountOut: ethers.utils.formatUnits(amountsIn[1], "ether"),
    };

    return Bloomer;
};

export interface IGetAmountsOut {
    amountIn: number;
    amountOut: number;
}

export const bloomexAmountsOut = async (nctrSwap: any, amountIn: any, address: any, provider: any, networkID: any) => {
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    let path = [addresses.USDCe_ADDRESS, addresses.NCTR_ADDRESS];
    if (nctrSwap == true) {
        path = [addresses.NCTR_ADDRESS, addresses.USDCe_ADDRESS];
    }

    const bloomexRouter = new ethers.Contract(addresses.BLOOMEX_ROUTER_ADDRESS, BloomexContract, signer);

    //get approval for nft

    const amountsIn = await bloomexRouter.getAmountsOut(amountIn, path);

    const Bloomer: IGetAmountsOut = {
        amountIn: amountsIn[0],
        amountOut: amountsIn[1],
    };
    return Bloomer;
};

interface ISwapExactTokensForTokens {
    nctrSwap: boolean;
    amountIn: number;
    address: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    networkID: Networks;
}

export const swapExactTokensForTokens = createAsyncThunk(
    "bloomex/swapExactTokensForTokens",
    async ({ nctrSwap, amountIn, address, provider, networkID }: ISwapExactTokensForTokens, { dispatch }) => {
        if (!provider) {
            dispatch(warning({ text: messages.please_connect_wallet }));
            return;
        }

        const addresses = getAddresses(networkID);
        const signer = provider.getSigner();
        const bloomexRouter = new ethers.Contract(addresses.NCTR_ADDRESS, NCTRContract, signer);
        let path = [addresses.USDCe_ADDRESS, addresses.NCTR_ADDRESS];
        let value = ethers.utils.parseUnits(amountIn.toString(), 6); // 1ONE
        let amoutns = "0";
        if (nctrSwap == true) {
            path = [addresses.NCTR_ADDRESS, addresses.USDCe_ADDRESS];
            value = ethers.utils.parseUnits(amountIn.toString(), 18); // 1ONE
            amoutns = "1000000";
        }

        const string1 = value.toString();
        let tx;
        try {
            const gasPrice = await getGasPrice(provider);

            if (nctrSwap === true) {
                tx = await bloomexRouter.swapTokenForUsdc(string1, amoutns);
            } else {
                tx = await bloomexRouter.swapUsdcForToken(string1, amoutns);
            }

            dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Swap", type: "creating" }));
            await tx.wait();
            dispatch(success({ text: messages.tx_successfully_send }));
        } catch (err: any) {
            return metamaskErrorWrap(err, dispatch);
        } finally {
            if (tx) {
                dispatch(clearPendingTxn(tx.hash));
            }
        }
        await sleep(2);
        dispatch(info({ text: messages.your_data_update_soon }));
        dispatch(info({ text: messages.your_data_updated }));
        return;
    },
);

export interface IApproveBloomexUSDCe {
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const approveBloomexUSDCe = createAsyncThunk("bloomex/approveBloomexUSDCe", async ({ provider, address, networkID }: IApproveBloomexUSDCe, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();

    const price = 15792089237316195423570985008687907853269984665640564039457584007913129639935;

    const usdceContract = new ethers.Contract(addresses.USDCe_ADDRESS, USDCeContract, signer);

    let approveTx;

    try {
        const gasPrice = await getGasPrice(provider);
        approveTx = await usdceContract.approve(addresses.LMS_ADDRESS, BigInt(price), { gasPrice });
        await approveTx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (approveTx) {
            dispatch(clearPendingTxn(approveTx.hash));
        }
    }

    return;
});

export interface IApproveBloomexNCTR {
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const approveBloomexNCTR = createAsyncThunk("bloomex/approveBloomexNCTR", async ({ provider, address, networkID }: IApproveBloomexNCTR, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const price = 15792089237316195423570985008687907853269984665640564039457584007913129639935;

    const nctrContract = new ethers.Contract(addresses.NCTR_ADDRESS, NCTRContract, signer);

    let approveTx;

    try {
        const gasPrice = await getGasPrice(provider);
        approveTx = await nctrContract.approve(addresses.LMS_ADDRESS, BigInt(price), { gasPrice });
        await approveTx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (approveTx) {
            dispatch(clearPendingTxn(approveTx.hash));
        }
    }

    return;
});
