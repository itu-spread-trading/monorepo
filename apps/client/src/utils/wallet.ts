import { useOneInchTokenPair, useWallet } from '@/store';
import { spreadSDK } from '@/utils/SDK';
import { ERC20ABI } from '@/utils/erc20abi';
import { SpreadSDKError } from '@ituspreadtrading/sdk';
import { ethers } from 'ethers';
import { maxInt256 } from 'viem';
import { useReadContract } from 'wagmi';

export const getWallet = () => {
    return spreadSDK.getWalletInstance();
};

export const useWalletTokenAllowance = () => {
    const wallet = useWallet();
    const oneInchTokenPair = useOneInchTokenPair();

    const { data: allowance } = useReadContract({
        account: wallet?.associatedAddress as `0x${string}`,
        abi: ERC20ABI,
        address: oneInchTokenPair.TOKEN as `0x${string}`,
        functionName: 'allowance',
        args: [
            wallet?.associatedAddress as `0x${string}`,
            oneInchTokenPair.TOKEN as `0x${string}`,
        ],
    });

    return allowance;
};

export const useApproveToken = () => {
    const oneInchTokenPair = useOneInchTokenPair();

    const approveToken = async () => {
        const wallet = getWallet();
        if (wallet == null) {
            throw SpreadSDKError.NotInitialized();
        }

        const contract = new ethers.Contract(
            oneInchTokenPair.TOKEN,
            ERC20ABI,
            wallet,
        );

        const tx = await contract.approve(oneInchTokenPair.TOKEN, maxInt256);
        const receipt = await tx.wait();
        return receipt;
    };

    return approveToken;
};
