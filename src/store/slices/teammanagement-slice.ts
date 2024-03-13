import { BigNumber, ethers } from "ethers";
import { getAddresses } from "../../constants";
import { BloomifyNFT, USDCeContract, FlowerUpgradableContract, NCTRContract } from "../../abi";
import { clearPendingTxn, fetchPendingTxns } from "./pending-txns-slice";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { loadAccountDetails } from "./account-slice";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Networks } from "../../constants/blockchain";
import { warning, success, info, error } from "./messages-slice";
import { messages } from "../../constants/messages";
import { getGasPrice } from "../../helpers/get-gas-price";
import { metamaskErrorWrap } from "../../helpers/metamask-error-wrap";
import { setAll, sleep, trim } from "../../helpers";
import { ColorLensOutlined } from "@material-ui/icons";
import moment from "moment";

export const bloomifyGetDownlinesInfo = async (wallet: any, provider: any, address: any, chanID: any) => {
    const addresses = getAddresses(chanID);
    const signer = provider.getSigner();

    const bloomifyContract = new ethers.Contract(addresses.FLOWER_UPGRADABLE_ADDRESS, FlowerUpgradableContract, provider);

    const userinfo = await bloomifyContract.users(wallet);

    const totalDepositedValue = await bloomifyContract.getDepositedValue(wallet);

    const getUserDownlines = await bloomifyContract.getUserDownlines(wallet);

    const bloomer: IDownlineData = {
        wallet: wallet,
        claims: Number(trim(userinfo[6] / Math.pow(10, 18), 2)),
        deposits: Number(trim(totalDepositedValue / Math.pow(10, 18), 2)),
        directs: getUserDownlines.length,
    };

    return bloomer;
};

export interface IDownlineData {
    wallet: string;
    directs: number;
    deposits: number;
    claims: number;
}

export const bloomifyGetDownlines = async (provider: any, address: any, chanID: any) => {
    const addresses = getAddresses(chanID);
    const signer = provider.getSigner();

    const FlowerUpgradable = new ethers.Contract(addresses.FLOWER_UPGRADABLE_ADDRESS, FlowerUpgradableContract, signer);

    let users = await FlowerUpgradable.getUserDownlines(address);

    let downlineInfoData = [];

    for (let i = 0; i < users.length; i++) {
        const wallet = users[i];
        //  console.log("wallet", wallet);
        const bloomer = await bloomifyGetDownlinesInfo(wallet, provider, address, chanID);

        const liist = [bloomer.wallet, bloomer.directs, bloomer.deposits, bloomer.claims];
        // console.log("bloomer", bloomer);
        downlineInfoData[i] = liist;
    }

    console.log("info data", downlineInfoData);
    return downlineInfoData;
};

export interface IApproveBloomify {
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const approveNCTR = createAsyncThunk("bloomify/approveNCTR", async ({ provider, address, networkID }: IApproveBloomify, { dispatch }) => {
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
        approveTx = await nctrContract.approve(addresses.FLOWER_UPGRADABLE_ADDRESS, BigInt(price), { gasPrice });
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

export interface IAirdropTeamNCTR {
    lisst: [];
    amount: number;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const airdropTeamNCTR = createAsyncThunk("bloomify/airdropTeamNCTR", async ({ lisst, amount, provider, address, networkID }: IAirdropTeamNCTR, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();

    const amounts = [];

    const air = amount / lisst.length;

    const airUint = ethers.utils.parseUnits(air.toString(), 18);

    for (let index = 0; index < lisst.length; index++) {
        amounts[index] = airUint;
    }

    const FlowerUpgradable = new ethers.Contract(addresses.FLOWER_UPGRADABLE_ADDRESS, FlowerUpgradableContract, signer);

    let approveTx;

    try {
        const gasPrice = await getGasPrice(provider);
        if (lisst.length == amounts.length) {
            approveTx = await FlowerUpgradable.airdrop(lisst, amounts, { gasPrice });
            await approveTx.wait();
            dispatch(success({ text: messages.tx_successfully_send }));
        }
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (approveTx) {
            dispatch(clearPendingTxn(approveTx.hash));
        }
    }
    return;
});

export interface ITeamData {
    UplineWallet: string;
    UplineIsTeamWallet: boolean;
    UplineTotalTeamMemers: string;
    UplineAirdropsSent: string;
    UplineLastAirdropTime: string;

    DownlineCompoundsNCTR: string;
    DownlineCompoundsUSDCe: string;
    DownlineDepositsNCTR: string;
    DownlineDepositsUSDCe: string;
    TeamWallet: boolean;
    TeamMembers: string;
    AirdropsSent: string;
}

export const getTeamLeaderInfo = async (provider: any, address: any, chanID: any) => {
    const addresses = getAddresses(chanID);
    const signer = provider.getSigner();

    const bloomifyContract = new ethers.Contract(addresses.FLOWER_UPGRADABLE_ADDRESS, FlowerUpgradableContract, provider);

    const userinfo = await bloomifyContract.users(address);

    const myUpline = userinfo[1];

    const myUplineTeam = await bloomifyContract.getUserDownlines(myUpline);

    const myUplineTeamCount = myUplineTeam.length;

    const uplineAirdrops = await bloomifyContract.airdrops(myUpline);

    const uplineAirdropsSent = trim(Number(uplineAirdrops[0]) / Math.pow(10, 18), 2);

    const time_to_show = uplineAirdrops[2];
    let t = new Date();
    t.setSeconds(time_to_show);
    const formatted = moment(t).format("dd.mm.yyyy");

    //-----------------------------------------------------------------

    const downlineRewardsTracker = await bloomifyContract.downlineRewardTracker(address);

    const myTeam = await bloomifyContract.getUserDownlines(address);

    const myAirdrops = await bloomifyContract.airdrops(address);

    const myTeamCount = myTeam.length;

    const airdropsSent = trim(Number(myAirdrops[0]) / Math.pow(10, 18), 2);

    const teamData: ITeamData = {
        UplineWallet: myUpline,
        UplineIsTeamWallet: myUplineTeamCount >= 5 ? true : false,
        UplineTotalTeamMemers: myUplineTeamCount,
        UplineAirdropsSent: uplineAirdropsSent,
        UplineLastAirdropTime: formatted,
        DownlineCompoundsNCTR: trim(downlineRewardsTracker[0] / Math.pow(10, 18), 2),
        DownlineCompoundsUSDCe: trim(Number(downlineRewardsTracker[1]) / Math.pow(10, 6), 2),
        DownlineDepositsNCTR: trim(Number(downlineRewardsTracker[2]) / Math.pow(10, 18), 2),
        DownlineDepositsUSDCe: trim(Number(downlineRewardsTracker[3]) / Math.pow(10, 6), 2),
        TeamWallet: myTeamCount >= 5 ? true : false,
        TeamMembers: myTeamCount,
        AirdropsSent: airdropsSent,
    };

    return teamData;
};
