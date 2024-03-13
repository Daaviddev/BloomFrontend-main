import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { ApeuContract, ApeuManagerContract, PoolManagerContract, WalletObserverContract, NCTRContract, BloomsManager } from "../../abi";
import { setAll } from "../../helpers";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider } from "@ethersproject/providers";
import { getnctrPrice, getTokenPrice } from "../../helpers";
import { RootState } from "../store";
import { sign } from "crypto";

interface ILoadAppDetails {
    networkID: number;
    provider: JsonRpcProvider;
}

interface IBloomifyInfo {
    claimTax: string;
    compoundTax: string;
    depositTax: string;
    teamWalletDownlineWalletPerc: string;
    totalAirdrops: string;
    totalDepositedNCTR: string;
    totalDepositedUSDCe: string;
    totalUsers: string;
    totalWithdraw: string;
}

export const loadAppDetails = createAsyncThunk(
    "app/loadAppDetails",
    //@ts-ignore
    async ({ networkID, provider }: ILoadAppDetails) => {
        const usdcePrice = getTokenPrice("USDC.e");
        const addresses = getAddresses(networkID);
        const signer = provider.getSigner();

        const bloomManager = new ethers.Contract(addresses.BLOOMS_MANAGER_ADDRESS, BloomsManager, signer);
        const nctrContract = new ethers.Contract(addresses.NCTR_ADDRESS, NCTRContract, provider);

        const nctrPrice = await getnctrPrice(networkID, provider);

        const totalSupply = Math.floor((await nctrContract.totalSupply()) / Math.pow(10, 18));

        let totalValueLocked = 0;
        try {
            totalValueLocked = Math.floor((await bloomManager.totalValueLocked()) / Math.pow(10, 18));
        } catch {}
        const totalFlowers = await bloomManager.bloomCounter();

        const burnedFromRenaming = Math.floor((await bloomManager.feesFromRenaming()) / Math.pow(10, 18));
        const calculateTotalDailyEmission = await bloomManager.calculateTotalDailyEmission();
        const creationMinPrice = ethers.utils.formatUnits(await bloomManager.creationMinPriceUsdc(), "ether");

        const getNodesAutoCompounding = await bloomManager.getBloomsCompounding();

        const getNumberOfNodesAutoCompounding = getNodesAutoCompounding.length;

        return {
            usdcePrice,
            totalSupply,
            totalFlowers,
            nctrPrice,
            totalValueLocked,
            burnedFromRenaming,
            calculateTotalDailyEmission,
            creationMinPrice,
            getNodesAutoCompounding,
            getNumberOfNodesAutoCompounding,
        };
    },
);

const initialState = {
    loading: true,
};

export interface IAppSlice {
    loading: boolean;
    usdcePrice: number;
    totalSupply: number;
    totalFlowers: number;
    nctrPrice: number;
    totalValueLocked: number;
    burnedFromRenaming: number;
    calculateTotalDailyEmission: number;
    creationMinPrice: string;
    networkID: number;
    getNodesAutoCompounding: [];
    getNumberOfNodesAutoCompounding: number;
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        fetchAppSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAppDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadAppDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadAppDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

const baseInfo = (state: RootState) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);
