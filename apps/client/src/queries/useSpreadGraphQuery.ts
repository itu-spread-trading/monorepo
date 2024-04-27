import { queries } from '@/queries/queries';
import { spreadSDK } from '@/utils';
import { SpreadSDKSupportedSymbols } from '@ituspreadtrading/sdk';
import { useQuery } from '@tanstack/react-query';

type Props = {
    symbol: SpreadSDKSupportedSymbols;
};

export const useSpreadGraphQuery = ({ symbol }: Props) => {
    return useQuery({
        queryKey: [queries.GRAPH],
        queryFn: async () => {
            const response = spreadSDK.getSpreadGraph({
                symbol,
                interval: '1h',
            });
            return response;
        },
    });
};
