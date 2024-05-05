import { queries } from '@/queries/queries';
import { MarketData } from '@/types';
import { SpreadFetcher } from '@/utils';
import { SpreadSDKSupportedSymbols } from '@ituspreadtrading/sdk';
import { useQuery } from '@tanstack/react-query';

const spreadFetcher = new SpreadFetcher();

export const defaultMarketData = {
    spotPrice: 0,
    futuresPrice: 0,
    bestAskPrice: 0,
    bestBidPrice: 0,
    futuresBestAskPrice: 0,
    futuresBestBidPrice: 0,
    spread: 0,
};

export const useMarketDataQuery = ({
    symbol,
}: {
    symbol: SpreadSDKSupportedSymbols;
}) => {
    const { data, ...rest } = useQuery<MarketData>({
        queryKey: [queries.MARKET + symbol],
        queryFn: async (): Promise<MarketData> => {
            const marketData = await spreadFetcher.fetch(symbol);
            return marketData ?? defaultMarketData;
        },
        refetchInterval: 1000,
    });

    return { data: data ?? defaultMarketData, ...rest };
};
