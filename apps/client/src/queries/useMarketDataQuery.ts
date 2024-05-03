import { queries } from '@/queries/queries';
import { SpreadFetcher } from '@/utils';
import { SpreadSDKSupportedSymbols } from '@ituspreadtrading/sdk';
import { useQuery } from '@tanstack/react-query';

const spreadFetcher = new SpreadFetcher();

export const useMarketDataQuery = ({
    symbol,
}: {
    symbol: SpreadSDKSupportedSymbols;
}) => {
    return useQuery({
        queryKey: [queries.MARKET + symbol],
        queryFn: async () => {
            const marketData = await spreadFetcher.fetch(symbol);
            return marketData;
        },
        refetchInterval: 1000,
    });
};
