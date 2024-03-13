import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { BloomifyNFT, USDCeContract } from "../../abi";
import { clearPendingTxn, fetchPendingTxns } from "./pending-txns-slice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadAccountDetails } from "./account-slice";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Networks } from "../../constants/blockchain";
import { warning, success, info, error } from "./messages-slice";
import { messages } from "../../constants/messages";
import { getGasPrice } from "../../helpers/get-gas-price";
import { metamaskErrorWrap } from "../../helpers/metamask-error-wrap";
import { sleep } from "../../helpers";
import { exit } from "process";

interface IMintNFT {
    nft: string;
    id: number;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const mintBloomify = createAsyncThunk("mint/mintBloomify", async ({ nft, id, provider, address, networkID }: IMintNFT, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const bloominfNFtManager = new ethers.Contract(addresses.BLOOM_NFT_ADDRESS, BloomifyNFT, signer);

    let tx;

    try {
        const gasPrice = await getGasPrice(provider);
        tx = await bloominfNFtManager.mint(address, id, { gasPrice });
        dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Minting NFT", type: "creating" }));
        await tx.wait();

        console.log(tx);

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
    await dispatch(loadAccountDetails({ networkID, provider, address }));
    dispatch(info({ text: messages.your_data_updated }));
    return;
});

interface IUpgradeNFT {
    nft: string;
    id: number;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const upgradeBloomify = createAsyncThunk("mint/upgradeBloomify", async ({ nft, id, provider, address, networkID }: IUpgradeNFT, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const bloominfNFtManager = new ethers.Contract(addresses.BLOOM_NFT_ADDRESS, BloomifyNFT, signer);
    id = 1;

    let tx;

    try {
        const gasPrice = await getGasPrice(provider);
        tx = await bloominfNFtManager.mint(address, id, { gasPrice });
        dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Creating Forest", type: "creating" }));
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
    await dispatch(loadAccountDetails({ networkID, provider, address }));
    dispatch(info({ text: messages.your_data_updated }));
    return;
});

export interface IApproveUSDCe {
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const approveUSDCe = createAsyncThunk("mint/approveUSDCe", async ({ provider, address, networkID }: IApproveUSDCe, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const allowAmount = "";

    const price = 15792089237316195423570985008687907853269984665640564039457584007913129639935;

    const usdceContract = new ethers.Contract(addresses.USDCe_ADDRESS, USDCeContract, signer);

    let approveTx;

    try {
        const gasPrice = await getGasPrice(provider);
        approveTx = await usdceContract.approve(addresses.BLOOM_NFT_ADDRESS, BigInt(price), { gasPrice });
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
