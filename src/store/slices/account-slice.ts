import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { ApeuContract, ApeuManagerContract, WalletObserverContract, USDCeContract, FlowerUpgradableContract, BloomsManager, NCTRContract } from "../../abi";
import { setAll, trim } from "../../helpers";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Networks } from "../../constants/blockchain";
import { RootState } from "../store";
import { BloomifyNFT } from "../../abi";
import { __String } from "typescript";

interface IGetBalances {
    address: string;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IAccountBalances {
    balances: {
        avax: string;
        apeu: string;
        usdce: string;
        nctr: string;
    };
}

export const getBalances = createAsyncThunk("account/getBalances", async ({ address, networkID, provider }: IGetBalances): Promise<IAccountBalances> => {
    const addresses = getAddresses(networkID);

    const avaxBalance = await provider.getSigner().getBalance();
    const avaxVal = ethers.utils.formatEther(avaxBalance);

    const natrContract = new ethers.Contract(addresses.NCTR_ADDRESS, ApeuContract, provider);

    // get natr balance
    const natrBalance = await natrContract.balanceOf(address);
    const natrVal = ethers.utils.formatUnits(natrBalance, "ether");

    const nctrContract = new ethers.Contract(addresses.NCTR_ADDRESS, NCTRContract, provider);

    const nctrVal = await nctrContract.balanceOf(address);

    const nctrBalance = await ethers.utils.formatUnits(nctrVal, "ether");

    const usdceContract = new ethers.Contract(addresses.USDCe_ADDRESS, USDCeContract, provider);

    const walletUsdceBalanc = await usdceContract.balanceOf(address);

    const walletUsdceBalance1 = walletUsdceBalanc.toNumber() / Math.pow(10, 6);

    const walletUsdceBalance = trim(walletUsdceBalance1, 2);

    return {
        balances: {
            avax: avaxVal,
            apeu: natrVal,
            usdce: walletUsdceBalance,
            nctr: nctrBalance,
        },
    };
});

interface ILoadAccountDetails {
    address: string;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
}

export interface IFlowerInfoDetails {
    id: number;
    name: string;
    creationTime: number;
    lastProcessingTimestamp: number;
    rewardMult: number;
    planetValue: number;
    totalClaimed: number;
    exists: boolean;
    pendingReward: number;
    rewardPerDay: number;
    compoundDelay: number;
    pendingRewardsGross: number;
    rewardPerDayGross: number;
    idnumber: number;
}

export interface IBloomBox {
    forestValue: number;
    nartValue: number;
    leafValue: number;
    leafToNart: number;
    claimed: number;
}

export interface INFTBalance {
    hasNft: boolean;
    nftTier: number;
}

export interface IApprovals {
    approvedValue: number;
    isUsdcApproved: boolean;
}

export interface IBloomifyInfo {
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
    pendingReward: any;
}

export interface IBloomBoxGlobal {
    bloomCounter: string;
    burnedFromRenaming: string;
    calculateTotalDailyEmission: string;
    creationMinPrice: string;
    totalValueLocked: string;
}

export interface IBloomBoxInfo {
    owner: string;
    id: number;
    name: string;
    creationTime: number;
    lastProcessingTimestamp: number;
    rewardMult: number;
    bloomValue: number;
    totalClaimed: number;
    timesCompounded: number;
    lockedUntil: number;
    lockPeriod: number;
    exists: boolean;
    pendingReward: number;
    rewardPerDay: number;
    compoundDelay: number;
}

export const loadAccountDetails = createAsyncThunk("account/loadAccountDetails", async ({ networkID, provider, address }: ILoadAccountDetails) => {
    const addresses = getAddresses(networkID);
    const needForApproval = 15792089237316195423570985008687907853269984665640564039457584007913129639935;

    const avaxBalance = await provider.getBalance(address);
    const avaxVal = ethers.utils.formatEther(avaxBalance);

    ////// NCTR BALANCE

    const nctrContract = new ethers.Contract(addresses.NCTR_ADDRESS, NCTRContract, provider);

    const nctrVal = await nctrContract.balanceOf(address);

    const nctrBalance = await ethers.utils.formatUnits(nctrVal, "ether");

    // CONTRACTSSSSSSSSSSSSSSSSSSSS ******************************************************

    const natrContract = new ethers.Contract(addresses.NCTR_ADDRESS, ApeuContract, provider);
    const natrManagerContract = new ethers.Contract(addresses.NATR_MANAGER_ADDRESS, ApeuManagerContract, provider);
    const walletObserverContract = new ethers.Contract(addresses.WALLET_OBSERVER_CONTRACT, WalletObserverContract, provider);
    const usdceContract = new ethers.Contract(addresses.USDCe_ADDRESS, USDCeContract, provider);
    const bloomifyContract = new ethers.Contract(addresses.FLOWER_UPGRADABLE_ADDRESS, FlowerUpgradableContract, provider);
    const bloomboxContract = new ethers.Contract(addresses.BLOOMS_MANAGER_ADDRESS, BloomsManager, provider);

    // getBloomifyInfo ********************************************************************

    const airdropsCall = await bloomifyContract.airdrops(address);

    const userinfo = await bloomifyContract.users(address);

    const totalDepositedValue = await bloomifyContract.getDepositedValue(address);

    const getUserDownlines = await bloomifyContract.getUserDownlines(address);

    const pendingReward = await bloomifyContract.getPendingReward(address);

    const bloomer: IBloomifyInfo = {
        maxPayout: String(totalDepositedValue * 3.64),
        isNetPositive: "True",
        walletUSDCe: String(userinfo[0]),
        upline: String(userinfo[1]),
        depositsNCTR: trim(Number(totalDepositedValue) / Math.pow(10, 18), 2),
        depositsUSDCe: String(userinfo[3]),
        lastDepositTime: String(userinfo[4]),
        APR: String(userinfo[5]),
        payouts: trim(Number(userinfo[6]) / Math.pow(10, 18), 2),
        dailyClaimAmount: trim(Number(userinfo[7]) / Math.pow(10, 18), 2),
        lastActionTime: String(userinfo[9]),
        nextActionTime: String(userinfo[10]),
        totalDeposit: trim(Number(totalDepositedValue) / Math.pow(10, 18), 2),
        airdropsGiven: String(airdropsCall[0]),
        airdropsReceived: String(airdropsCall[1]),
        lastAirdropTime: String(airdropsCall[2]),
        userDownlines: getUserDownlines,
        userDownilnesCount: getUserDownlines.length,
        pendingReward: trim(Number(pendingReward) / Math.pow(10, 18), 2),
    };

    //get approval for nft ----------------------------------------------------------------------------------

    const approvedValue = await usdceContract.allowance(address, addresses.BLOOM_NFT_ADDRESS);
    const approvedBloomifyValue = await usdceContract.allowance(address, addresses.FLOWER_UPGRADABLE_ADDRESS);
    const approvedBloomBoxValue = await usdceContract.allowance(address, addresses.BLOOMS_MANAGER_ADDRESS);
    const approvedBloomBoxNCTRValue = await nctrContract.allowance(address, addresses.BLOOMS_MANAGER_ADDRESS);
    const approvedBloomexUSDCeValue = await usdceContract.allowance(address, addresses.BLOOMEX_ROUTER_ADDRESS);
    const approvedBloomexNCTRValue = await nctrContract.allowance(address, addresses.BLOOMEX_ROUTER_ADDRESS);

    let isApproved = false;
    let isBloomifyApproved = false;
    let isBloomBoxApproved = false;
    let isBloomBoxNCTRApproved = false;
    let isBloomexUSDCeApproved = false;
    let isBloomexNCTRApproved = false;

    if (approvedValue > 0 && approvedValue == needForApproval) {
        isApproved = true;
    }

    if (approvedBloomifyValue > 0 && approvedBloomifyValue == needForApproval) {
        isBloomifyApproved = true;
    }

    if (approvedBloomBoxValue > 0 && approvedBloomBoxValue == needForApproval) {
        isBloomBoxApproved = true;
    }

    if (approvedBloomBoxNCTRValue > 0 && approvedBloomBoxNCTRValue == needForApproval) {
        isBloomBoxNCTRApproved = true;
    }

    if (approvedBloomexUSDCeValue > 0 && approvedBloomexUSDCeValue == needForApproval) {
        isBloomexUSDCeApproved = true;
    }

    if (approvedBloomexNCTRValue > 0 && approvedBloomexNCTRValue == needForApproval) {
        isBloomexNCTRApproved = true;
    }

    //get approval for Bloomify

    //get approval for BloomBox

    //get usdce balance----------------------------------------------------------

    const walletUsdceBalanc = await usdceContract.balanceOf(address);

    const walletUsdceBalance1 = walletUsdceBalanc.div("100000").toString();

    const walletUsdceBalance = trim(walletUsdceBalance1, 2);

    // get natr balance----------------------------------------------------------------------
    const natrBalance = await natrContract.balanceOf(address);

    const natrVal = ethers.utils.formatUnits(natrBalance, "ether");

    //get natr allowance-------------------------------------------------------------------
    const natrAllowance = await natrContract.allowance(address, addresses.NATR_MANAGER_ADDRESS);

    const natrAll = ethers.utils.formatUnits(natrAllowance, "ether");

    //get BLOOM NODE INFO---------------------------------------------------

    const bloomIds = await bloomboxContract.getBloomIdsOf(address);

    //  const planetIds = await natrManagerContract.getPlanetIdsOf(address);

    const bloomBoxData = await bloomboxContract.getBloomsByIds(bloomIds);

    const bloombBoxCount = bloomBoxData.length;

    let bloomBoxInfoData = [];
    let bloomEstimatedPerDay = 0;
    let bloomTotalPendingReward = 0;

    for (let i = 0; i < bloombBoxCount; i++) {
        const bloombox: IBloomBoxInfo = {
            owner: String(bloomBoxData[i][0][0]),
            id: Number(bloomBoxData[i][0][1]),
            name: String(bloomBoxData[i][0][2]),
            creationTime: Number(bloomBoxData[i][0][3]),
            lastProcessingTimestamp: Number(bloomBoxData[i][0][4]),
            rewardMult: Number(bloomBoxData[i][0][5]),
            bloomValue: Number(bloomBoxData[i][0][6]),
            totalClaimed: Number(bloomBoxData[i][0][7]),
            timesCompounded: Number(bloomBoxData[i][0][8]),
            lockedUntil: Number(bloomBoxData[i][0][9]),
            lockPeriod: Number(bloomBoxData[i][0][10]),
            exists: Boolean(bloomBoxData[i][0][7]),
            pendingReward: Number(bloomBoxData[i][2]),
            rewardPerDay: Number(bloomBoxData[i][3]),
            compoundDelay: Number(bloomBoxData[i][4]),
        };

        bloomEstimatedPerDay += Number(bloomBoxData[i][3]);
        bloomTotalPendingReward += Number(bloomBoxData[i][2]);

        bloomBoxInfoData[i] = bloombox;
    }

    const totalPendingRewardValueBloomBox = bloomTotalPendingReward / Math.pow(10, 18);

    //get node data
    const planetIds = [1];
    //  const planetIds = await natrManagerContract.getPlanetIdsOf(address);

    //const planetData = await natrManagerContract.getPlanetsByIds(planetIds);
    //const planetData = [];
    // const planetCount = planetData.length;

    let planetInfoData = [];
    let estimatedPerDay = 0;
    let totalPendingReward = 0;

    /* for (let i = 0; i < planetCount; i++) {
        const planet: IFlowerInfoDetails = {
            id: Number(planetData[i][0][0]),
            name: String(planetData[i][0][1]),
            creationTime: Number(planetData[i][0][2]),
            lastProcessingTimestamp: Number(planetData[i][0][3]),
            rewardMult: Number(planetData[i][0][4]),
            planetValue: Number(planetData[i][0][5]) / Math.pow(10, 18),
            totalClaimed: Number(planetData[i][0][6]) / Math.pow(10, 18),
            exists: Boolean(planetData[i][0][7]),
            pendingReward: Number(planetData[i][2]) / Math.pow(10, 18),
            rewardPerDay: Number(planetData[i][3]) / Math.pow(10, 18),
            compoundDelay: Number(planetData[i][4]),
            pendingRewardsGross: Number(planetData[i][5]) / Math.pow(10, 18),
            rewardPerDayGross: Number(planetData[i][6]) / Math.pow(10, 18),

            idnumber: Number(i),
        };

        estimatedPerDay += Number(planetData[i][3]);
        totalPendingReward += Number(planetData[i][2]);

        planetInfoData[i] = planet;
    } */

    const estimatedPerDayValue = estimatedPerDay / Math.pow(10, 18);
    const totalPendingRewardValue = totalPendingReward / Math.pow(10, 18);

    //get limits data --------------------------------------------------------------------------------------------------------------------------------------

    //let [, , , remainingTransfersIn, remainingTransferOut, remainingSellOut] = await walletObserverContract.getOverviewOf(address);

    /*  remainingTransfersIn = ethers.utils.formatUnits(remainingTransfersIn, "ether");
    remainingTransferOut = ethers.utils.formatUnits(remainingTransferOut, "ether");
    remainingSellOut = ethers.utils.formatUnits(remainingSellOut, "ether"); */

    // GET BLOOM NFT DATA :-------------------------------------------------------------------------------------------------

    let tier = 0;
    let haveNft = false;
    const bloomNftContract = new ethers.Contract(addresses.BLOOM_NFT_ADDRESS, BloomifyNFT, provider);

    for (let i = 1; i < 16; i++) {
        let positive = 0;
        positive = await bloomNftContract.balanceOf(address, i);

        if (positive > 0) {
            tier = i;
            haveNft = true;
            break;
        }
    }

    return {
        balances: {
            avax: avaxVal,
            apeu: natrVal,
            allowance: natrAll,
            usdce: walletUsdceBalance,
            nctr: nctrBalance,
        },
        limits: {
            transferIn: 0,
            transferOut: 0,
            sellOut: 0,
        },
        planets: [],

        number: 0,
        estimated: estimatedPerDayValue,
        bloomifyUserInfo: bloomer,
        totalpending: totalPendingRewardValueBloomBox,
        totalPendingBloomBox: bloomTotalPendingReward,
        nftBalances: {
            hasNft: haveNft,
            nftTier: tier,
        },
        bloombox: bloomBoxInfoData,
        approvals: {
            approvedValue: approvedValue,
            isUsdcApproved: isApproved,
            isBloomifyApproved: isBloomifyApproved,
            isBloomBoxApproved: isBloomBoxApproved,
            isBloomBoxNCTRApproved: isBloomBoxNCTRApproved,
            isBloomexUSDCeApproved: isBloomexUSDCeApproved,
            isBloomexNCTRApproved: isBloomexNCTRApproved,
        },
    };
});

const initialState = {
    loading: true,
};

export interface IAccountSlice {
    loading: boolean;
    balances: {
        avax: string;
        apeu: string;
        allowance: string;
        usdce: string;
        nctr: string;
    };
    limits: {
        transferIn: string;
        transferOut: string;
        sellOut: string;
    };
    planets: IFlowerInfoDetails[];
    bloombox: IBloomBoxInfo[];
    number: number;
    estimated: number;
    totalpending: number;
    totalPendingBloombox: number;
    bloomifyUserInfo: IBloomifyInfo;
    nftBalances: {
        hasNft: boolean;
        nftTier: number;
    };
    approvals: {
        approvedValue: number;
        isUsdcApproved: boolean;
        isBloomifyApproved: boolean;
        isBloomBoxApproved: boolean;
        isBloomBoxNCTRApproved: boolean;
        isBloomexUSDCeApproved: boolean;
        isBloomexNCTRApproved: boolean;
    };
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        fetchAccountSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAccountDetails.pending, state => {
                state.loading = true;
            })
            .addCase(loadAccountDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = true;
            })
            .addCase(loadAccountDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
