import { queries } from '@/queries/queries';
import { spreadSDK } from '@/utils';
import { SpreadGraphQueryParams } from '@ituspreadtrading/sdk';
import { useQuery } from '@tanstack/react-query';

type Props = SpreadGraphQueryParams;

export const useSpreadGraphQuery = ({ symbol, interval }: Props) => {
    return useQuery({
        queryKey: [queries.GRAPH + interval],
        queryFn: async () => {
            const response = spreadSDK.getSpreadGraph({
                symbol,
                interval,
            });
            return response;
        },
    });
};

export const useSpreadMeanGraphQuery = ({
    symbol,
    interval = '5m',
    range = '1m',
}: Props) => {
    return useQuery({
        queryKey: [queries.MEAN_GRAPH + interval + range],
        queryFn: async () => {
            const response = spreadSDK.getSpreadMeanGraph({
                symbol,
                interval,
                range,
            });
            return response;
        },
    });
};
