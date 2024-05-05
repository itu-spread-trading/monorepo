import { queries } from '@/queries/queries';
import { spreadSDK } from '@/utils';
import { SpreadSDKSupportedSymbols } from '@ituspreadtrading/sdk';
import { useQuery } from '@tanstack/react-query';

type Props = {
    symbol: SpreadSDKSupportedSymbols;
};

export const useTokenPairQuery = ({ symbol }: Props) => {
    return useQuery({
        queryKey: [queries.TOKEN_PAIR + symbol],
        queryFn: async () => {
            const tokenPair = await spreadSDK.genTokenPair(symbol);
            return tokenPair;
        },
    });
};
