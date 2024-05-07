import { useMarketDataContext } from '@/context';
import { useTokenPair } from '@/store';
import { symbolToDecimal } from '@/utils/symbolToDecimal';
import { BigNumber } from 'ethers';
import { parseUnits } from 'viem';

export const useGetTokenAmountFromUSD = () => {
    const { spotPrice } = useMarketDataContext();
    const tokenPair = useTokenPair();

    const getTokenAmountFromUSD = (usdAmount: number) => {
        if (spotPrice === 0) {
            return 0;
        }
        return usdAmount / spotPrice;
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

    return { getParsedAmount, getTokenAmountFromUSD };
};
