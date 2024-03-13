import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { ApeuManagerContract, BloomBoxNFT, BloomsManager, NCTRContract, USDCeContract } from "../../abi";
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

interface ICreateFlower {
    name: string;
    quantity: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const createFlower = createAsyncThunk("bloombox/createFlower", async ({ name, quantity, provider, address, networkID }: ICreateFlower, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const bloomManager = new ethers.Contract(addresses.BLOOMS_MANAGER_ADDRESS, BloomsManager, signer);

    let quantityUint = ethers.utils.parseUnits(quantity, 6);

    let quantityStr = quantityUint.toString();

    let tx;

    try {
        const gasPrice = await getGasPrice(provider);

        tx = await bloomManager.createBloomWithUsdc(name, quantityStr, { gasPrice });

        dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Creating Flower", type: "creating" }));
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

interface IAddFlower {
    id: string;
    quantity: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const addFlower = createAsyncThunk("bloombox/addFlower", async ({ id, quantity, provider, address, networkID }: IAddFlower, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const bloomManager = new ethers.Contract(addresses.BLOOMS_MANAGER_ADDRESS, BloomsManager, signer);

    let quantityUint = ethers.utils.parseUnits(quantity, 18);

    let quantityStr = quantityUint.toString();

    let tx;

    try {
        const gasPrice = await getGasPrice(provider);

        tx = await bloomManager.addValue(id, quantityStr, { gasPrice });

        dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Add Tokens", type: "creating" }));
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

interface IEmergancyClaim {
    strignId: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const emergancyClaim = createAsyncThunk("bloombox/emergancyClaim", async ({ strignId, provider, address, networkID }: IEmergancyClaim, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const bloomManager = new ethers.Contract(addresses.BLOOMS_MANAGER_ADDRESS, BloomsManager, signer);

    let tx;

    let intID = Number(strignId);

    try {
        const gasPrice = await getGasPrice(provider);

        tx = await bloomManager.emergencyClaim(intID, { gasPrice });

        dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Emergancy Claim", type: "creating" }));
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

interface IRenameBloom {
    id: string;
    name: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const renameBloom = createAsyncThunk("bloombox/renameBloom", async ({ id, name, provider, address, networkID }: IRenameBloom, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const bloomManager = new ethers.Contract(addresses.BLOOMS_MANAGER_ADDRESS, BloomsManager, signer);

    let tx;

    try {
        const gasPrice = await getGasPrice(provider);

        tx = await bloomManager.renameBloom(id, name, { gasPrice });

        dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Rename Flower", type: "creating" }));
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

export interface IApproveBloombox {
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const approveBloombox = createAsyncThunk("bloombox/approveBloombox", async ({ provider, address, networkID }: IApproveBloombox, { dispatch }) => {
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
        approveTx = await usdceContract.approve(addresses.BLOOMS_MANAGER_ADDRESS, BigInt(price), { gasPrice });
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

export interface IApproveBloomboxNCTR {
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const approveBloomboxNCTR = createAsyncThunk("bloombox/approveBloomboxNCTR", async ({ provider, address, networkID }: IApproveBloomboxNCTR, { dispatch }) => {
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
        approveTx = await nctrContract.approve(addresses.BLOOMS_MANAGER_ADDRESS, BigInt(price), { gasPrice });
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
interface IAirdropFlower {
    wallet: string;
    idOfNode: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const airdropFlower = createAsyncThunk("bloombox/airdropFlower", async ({ wallet, idOfNode, provider, address, networkID }: IAirdropFlower, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const bloomManager = new ethers.Contract(addresses.BLOOMBOX_NFT, BloomBoxNFT, signer);

    console.log(wallet);

    let tx;

    try {
        const gasPrice = await getGasPrice(provider);

        tx = await bloomManager.transferFrom(address, wallet, idOfNode, { gasPrice });

        dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Sending", type: "creating" }));
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

interface IStartCompounding {
    IdNode: string;
    days: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const startCompounding = createAsyncThunk("bloombox/airdropFlower", async ({ days, IdNode, provider, address, networkID }: IStartCompounding, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const bloomManager = new ethers.Contract(addresses.BLOOMS_MANAGER_ADDRESS, BloomsManager, signer);

    let tx;

    try {
        const gasPrice = await getGasPrice(provider);

        tx = await bloomManager.startAutoCompounding(IdNode, days, { gasPrice });

        dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Start Autocompound", type: "creating" }));
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
