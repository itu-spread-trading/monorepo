import { ethers } from 'ethers';
import { Environment } from 'src/utils/Environment';

export const getProvider = () =>
    new ethers.providers.JsonRpcProvider(Environment.BSC_RPC_URL);

export const getTreasuryWallet = (): ethers.Wallet => {
    return new ethers.Wallet(Environment.TREASURY_PV_KEY, getProvider());
};
