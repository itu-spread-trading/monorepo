import { useOneInchTokenPair, useWallet } from '@/store';
import { spreadSDK } from '@/utils/SDK';
import { ERC20ABI } from '@/utils/erc20abi';
import { SpreadSDKError } from '@ituspreadtrading/sdk';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { maxInt256 } from 'viem';
import { useReadContract } from 'wagmi';

export const getWallet = () => {
    return spreadSDK.getWalletInstance();
};

export const useWalletTokenAllowance = () => {
    const wallet = useWallet();
    const oneInchTokenPair = useOneInchTokenPair();

    const { data: allowance, refetch } = useReadContract({
        account: wallet?.associatedAddress as `0x${string}`,
        abi: ERC20ABI,
        address: oneInchTokenPair.TOKEN as `0x${string}`,
        functionName: 'allowance',
        args: [
            wallet?.associatedAddress as `0x${string}`,
            spreadSDK.orderbook.getProtocolAddress() as `0x${string}`,
        ],
    });

    return { allowance, refetch };
};

export const useApproveToken = () => {
    const oneInchTokenPair = useOneInchTokenPair();

    const approveToken = async (spender: string) => {
        const wallet = getWallet();
        if (wallet == null) {
            throw SpreadSDKError.NotInitialized();
        }

        const contract = new ethers.Contract(
            oneInchTokenPair.TOKEN,
            ERC20ABI,
            wallet,
        );

        const tx = await contract.approve(spender, maxInt256);
        const receipt = await tx.wait();
        return receipt;
    };

    return approveToken;
};

export const useWalletTokenBalance = (): bigint => {
    const wallet = useWallet();
    const oneInchTokenPair = useOneInchTokenPair();

    const { data: balance, refetch } = useReadContract({
        account: wallet?.associatedAddress as `0x${string}`,
        abi: ERC20ABI,
        address: oneInchTokenPair.TOKEN as `0x${string}`,
        functionName: 'balanceOf',
        args: [wallet?.associatedAddress as `0x${string}`],
    });

    useEffect(() => {
        const interval = setInterval(() => {
            refetch();
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (balance as bigint) ?? 0n;
};

export const useWalletUSDTBalance = (): bigint => {
    const wallet = useWallet();
    const oneInchTokenPair = useOneInchTokenPair();

    const { data: balance, refetch } = useReadContract({
        account: wallet?.associatedAddress as `0x${string}`,
        abi: ERC20ABI,
        address: oneInchTokenPair.USDT as `0x${string}`,
        functionName: 'balanceOf',
        args: [wallet?.associatedAddress as `0x${string}`],
    });

    useEffect(() => {
        const interval = setInterval(() => {
            refetch();
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (balance as bigint) ?? 0n;
};

export const useWalletUSDTAllowance = () => {
    const wallet = useWallet();
    const oneInchTokenPair = useOneInchTokenPair();

    const { data: allowance, refetch } = useReadContract({
        account: wallet?.associatedAddress as `0x${string}`,
        abi: ERC20ABI,
        address: oneInchTokenPair.USDT as `0x${string}`,
        functionName: 'allowance',
        args: [
            wallet?.associatedAddress as `0x${string}`,
            spreadSDK.orderbook.getProtocolAddress() as `0x${string}`,
        ],
    });

    return { allowance, refetch };
};

export const useApproveUSDT = () => {
    const oneInchTokenPair = useOneInchTokenPair();

    const approveToken = async (spender: string) => {
        const wallet = getWallet();
        if (wallet == null) {
            throw SpreadSDKError.NotInitialized();
        }

        const contract = new ethers.Contract(
            oneInchTokenPair.USDT,
            ERC20ABI,
            wallet,
        );

        const tx = await contract.approve(spender, maxInt256);
        const receipt = await tx.wait();
        return receipt;
    };

    return approveToken;
};

export const useWalletTokenAllowanceForSwap = () => {
    const wallet = useWallet();
    const oneInchTokenPair = useOneInchTokenPair();

    const { data: allowance, refetch } = useReadContract({
        account: wallet?.associatedAddress as `0x${string}`,
        abi: ERC20ABI,
        address: oneInchTokenPair.TOKEN as `0x${string}`,
        functionName: 'allowance',
        args: [
            wallet?.associatedAddress as `0x${string}`,
            spreadSDK.swap.getRouterAddress(),
        ],
    });

    return { allowance, refetch };
};

export const useWalletUSDTAllowanceForSwap = () => {
    const wallet = useWallet();
    const oneInchTokenPair = useOneInchTokenPair();

    const { data: allowance, refetch } = useReadContract({
        account: wallet?.associatedAddress as `0x${string}`,
        abi: ERC20ABI,
        address: oneInchTokenPair.USDT as `0x${string}`,
        functionName: 'allowance',
        args: [
            wallet?.associatedAddress as `0x${string}`,
            spreadSDK.swap.getRouterAddress(),
        ],
    });

    return { allowance, refetch };
};
