import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { BloomifyNFT, USDCeContract, FlowerUpgradableContract, LpReserveContract } from "../../abi";
import { clearPendingTxn, fetchPendingTxns } from "./pending-txns-slice";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { loadAccountDetails } from "./account-slice";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Networks } from "../../constants/blockchain";
import { warning, success, info, error } from "./messages-slice";
import { messages } from "../../constants/messages";
import { getGasPrice } from "../../helpers/get-gas-price";
import { metamaskErrorWrap } from "../../helpers/metamask-error-wrap";
import { setAll, sleep } from "../../helpers";

interface IBloomifyDeposit {
    upline: string;
    quantity: number;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const bloomifyDeposit = createAsyncThunk("bloomify/bloomifyDeposit", async ({ upline, quantity, provider, address, networkID }: IBloomifyDeposit, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }

    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    sleep(100);
    const FlowerUpgradable = new ethers.Contract(addresses.FLOWER_UPGRADABLE_ADDRESS, FlowerUpgradableContract, signer);
    let tx;

    try {
        const gasPrice = await getGasPrice(provider);
        let value = ethers.utils.parseUnits(quantity.toString(), 6);
        // 1ONE
        console.log("dhfbh");
        tx = await FlowerUpgradable.deposit(value, upline, { gasPrice });
        dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Deposit", type: "creating" }));
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

interface ISetUsdceWallet {
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const setUsdceWallet = createAsyncThunk("bloomify/setUsdceWallet", async ({ provider, address, networkID }: ISetUsdceWallet, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const FlowerUpgradable = new ethers.Contract(addresses.FLOWER_UPGRADABLE_ADDRESS, FlowerUpgradableContract, signer);

    let tx;

    try {
        const gasPrice = await getGasPrice(provider);
        tx = await FlowerUpgradable.setUSDCeWallet(address, { gasPrice });
        dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "SetUsdceWallet", type: "creating" }));
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

interface IBloomifyClaim {
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const bloomifyClaim = createAsyncThunk("bloomify/bloomifyClaim", async ({ provider, address, networkID }: IBloomifyClaim, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const FlowerUpgradable = new ethers.Contract(addresses.FLOWER_UPGRADABLE_ADDRESS, FlowerUpgradableContract, signer);

    let tx;

    try {
        const gasPrice = await getGasPrice(provider);
        tx = await FlowerUpgradable.claim({ gasPrice });
        dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Claim", type: "creating" }));
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

interface IBloomifyCompound {
    value: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const bloomifyCompound = createAsyncThunk("bloomify/bloomifyCompound", async ({ value, provider, address, networkID }: IBloomifyCompound, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const uintValue = Number(value) * 1e18; // 1ONE;
    const uintstr = uintValue.toString();
    const FlowerUpgradable = new ethers.Contract(addresses.FLOWER_UPGRADABLE_ADDRESS, FlowerUpgradableContract, signer);

    let tx;

    try {
        const gasPrice = await getGasPrice(provider);
        tx = await FlowerUpgradable.compoundRewards({ gasPrice });
        dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Compound", type: "creating" }));
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

export interface IBloomifyPlayer {
    maxPayout: string;
    isNetPositive: string;
    walletUSDCe: string;
    upline: string;
    depositsNCTR: string;
    depositsUSDCe: string;
    lastDepositTime: string;
    APR: string;
    payouts: string;
    dailyClaimAmount: string;
    lastActionTime: string;
    nextActionTime: string;
    totalDeposit: string;
    airdropsGiven: string;
    airdropsReceived: string;
    lastAirdropTime: string;
    userDownlines: any;
    userDownilnesCount: any;
}

export const bloomifyCheckPlayer = async (wallet: any, provider: any, address: any, networkID: any) => {
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();

    const FlowerUpgradable = new ethers.Contract(addresses.FLOWER_UPGRADABLE_ADDRESS, FlowerUpgradableContract, signer);

    //get approval for nft
    const airdropsCall = await FlowerUpgradable.airdrops(wallet);

    const userinfo = await FlowerUpgradable.users(wallet);

    const totalDepositedValue = await FlowerUpgradable.getDepositedValue(address);
    const getUserDownlines = await FlowerUpgradable.getUserDownlines(address);
    let maxPayyout = userinfo[3] * 3.65;

    const bloomer: IBloomifyPlayer = {
        maxPayout: String(maxPayyout),
        isNetPositive: "True",
        walletUSDCe: String(userinfo[0]),
        upline: String(userinfo[1]),
        depositsNCTR: String(userinfo[2]),
        depositsUSDCe: String(userinfo[3]),
        lastDepositTime: String(userinfo[4]),
        APR: String(userinfo[5]),
        payouts: String(userinfo[6]),
        dailyClaimAmount: String(userinfo[7]),
        lastActionTime: String(userinfo[8]),
        nextActionTime: String(userinfo[9]),
        totalDeposit: String(totalDepositedValue),
        airdropsGiven: String(airdropsCall[0]),
        airdropsReceived: String(airdropsCall[1]),
        lastAirdropTime: String(airdropsCall[2]),
        userDownlines: getUserDownlines,
        userDownilnesCount: getUserDownlines.length,
    };

    return bloomer;
};

export interface IApproveBloomify {
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const approveBloomify = createAsyncThunk("bloomify/approveUSDCe", async ({ provider, address, networkID }: IApproveBloomify, { dispatch }) => {
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
        approveTx = await usdceContract.approve(addresses.FLOWER_UPGRADABLE_ADDRESS, BigInt(price), { gasPrice });
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

export interface IFixAPRBloomify {
    wallet: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const fixAPRBloomify = createAsyncThunk("bloomify/fixAPRBloomify", async ({ wallet, provider, address, networkID }: IFixAPRBloomify, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();

    const flowerContract = new ethers.Contract(addresses.FLOWER_UPGRADABLE_ADDRESS, FlowerUpgradableContract, signer);

    let approveTx;

    try {
        const gasPrice = await getGasPrice(provider);
        approveTx = await flowerContract.updateAPR(wallet, { gasPrice });
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

export async function getnctrPrice(networkID: Networks, provider: ethers.Signer | ethers.providers.Provider): Promise<number> {
    const addresses = getAddresses(networkID);
    const pairContract = new ethers.Contract(addresses.NCTR_PAIR_ADDRESS, LpReserveContract, provider);

    const reserves = await pairContract.getReserves();

    const nctrPrice = (reserves[1] / reserves[0]) * 10000;

    console.log("nctrPricee", nctrPrice);
    return nctrPrice;
    // return 0;
}
