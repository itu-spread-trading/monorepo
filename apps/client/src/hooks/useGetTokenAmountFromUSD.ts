import { useMarketDataContext } from '@/context';
import { useTokenPair } from '@/store';
import { symbolToDecimal } from '@/utils/symbolToDecimal';
import { BigNumber } from 'ethers';
import { formatUnits, parseUnits } from 'viem';

export const useGetTokenAmountFromUSD = () => {
    const { spotPrice } = useMarketDataContext();
    const tokenPair = useTokenPair();

    const getFuturesUSDAmount = (spread: number) => {
        const realSpread = spread / 100;
        const expSpread = Math.exp(realSpread);
        const futuresPrice = expSpread * spotPrice;
        return futuresPrice;
    };

    const getFuturesTokenAmount = (spread: number, size: number) => {
        const futuresUSDAmount = getFuturesUSDAmount(spread) * size;
        const usdAmount = getTokenAmountFromUSD(futuresUSDAmount);

        try {
            const decimal = symbolToDecimal(tokenPair);

            if (spotPrice === 0) {
                return BigNumber.from(0);
            }

            return parseUnits(
                (usdAmount / spotPrice).toFixed(decimal),
                decimal,
            );
        } catch {
            return BigNumber.from(0);
        }
    };

    const getTokenAmountFromUSD = (usdAmount: number) => {
        if (spotPrice === 0) {
            return 0;
        }
        return usdAmount / spotPrice;
    };

    const getParsedUSDTAmount = (usdAmount: number) => {
        try {
            return parseUnits(String(usdAmount), 18);
        } catch {
            return BigNumber.from(0);
        }
    };

    const getParsedAmount = (usdAmount: number) => {
        try {
            const decimal = symbolToDecimal(tokenPair);

            if (spotPrice === 0) {
                return BigNumber.from(0);
            }

            return parseUnits(
                (usdAmount / spotPrice).toFixed(decimal),
                decimal,
            );
        } catch {
            return BigNumber.from(0);
        }
    };

    const getTokenAmountInUsd = (
        tokenAmount: bigint,
        decimal = symbolToDecimal(tokenPair),
    ) => {
        const num = Number(formatUnits(tokenAmount, decimal)) * spotPrice;
        return num.toFixed(4);
    };

    return {
        getParsedAmount,
        getTokenAmountFromUSD,
        getFuturesUSDAmount,
        getFuturesTokenAmount,
        getParsedUSDTAmount,
        getTokenAmountInUsd,
    };
};
