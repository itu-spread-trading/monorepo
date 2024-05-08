import { useMarketDataContext } from '@/context';
import { useTokenPair } from '@/store';
import { symbolToDecimal } from '@/utils/symbolToDecimal';
import { BigNumber } from 'ethers';
import { parseUnits } from 'viem';

export const useGetTokenAmountFromUSD = () => {
    const { spotPrice } = useMarketDataContext();
    const tokenPair = useTokenPair();

    const getFuturesUSDAmount = (spread: number) => {
        const realSpread = spread / 100;
        const expSpread = Math.exp(realSpread);
        const futuresPrice = expSpread * spotPrice;
        return futuresPrice;
    };

    const getFuturesTokenAmount = (spread: number, sellSize: number) => {
        const futuresUSDAmount = getFuturesUSDAmount(spread) * sellSize;
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
            return parseUnits(usdAmount.toFixed(6), 6);
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

    return {
        getParsedAmount,
        getTokenAmountFromUSD,
        getFuturesUSDAmount,
        getFuturesTokenAmount,
        getParsedUSDTAmount,
    };
};
