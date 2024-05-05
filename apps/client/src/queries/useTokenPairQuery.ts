import { queries } from '@/queries/queries';
import { useSetOneInchTokenPair } from '@/store';
import { spreadSDK } from '@/utils';
import { SpreadSDKSupportedSymbols } from '@ituspreadtrading/sdk';
import { useQuery } from '@tanstack/react-query';

type Props = {
    symbol: SpreadSDKSupportedSymbols;
};

export const useTokenPairQuery = ({ symbol }: Props) => {
    const setOneInchTokenPair = useSetOneInchTokenPair();

    return useQuery({
        queryKey: [queries.TOKEN_PAIR + symbol],
        queryFn: async () => {
            const tokenPair = await spreadSDK.genTokenPair(symbol);
            setOneInchTokenPair(tokenPair);
            return tokenPair;
        },
        retry: 5,
        retryDelay: 2000,
    });
};
