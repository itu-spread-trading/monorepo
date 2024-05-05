import { queries } from '@/queries/queries';
import { spreadSDK } from '@/utils';
import { SpreadGraphQueryParams } from '@ituspreadtrading/sdk';
import { useQuery } from '@tanstack/react-query';

type Props = SpreadGraphQueryParams;

export const useSpreadGraphQuery = ({ symbol, interval }: Props) => {
    return useQuery({
        queryKey: [queries.GRAPH + interval + symbol],
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
        queryKey: [queries.MEAN_GRAPH + interval + range + symbol],
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

export const useSpreadStandardDeviation = ({ symbol, range = '1m' }: Props) => {
    const interval = '5m';
    const { data, ...rest } = useQuery({
        queryKey: [queries.STANDARD_DEVIATION + symbol + range],
        queryFn: async () => {
            const response = await spreadSDK.getSpreadStandardDeviation({
                symbol,
                interval,
                range,
            });
            return response.value;
        },
    });

    return { data: data ?? 0, ...rest };
};
