import { queries } from '@/queries/queries';
import { useWallet } from '@/store';
import { spreadSDK } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

export const useLastOrderQuery = () => {
    const wallet = useWallet();
    const { isConnected } = useAccount();

    return useQuery({
        queryKey: [queries.LAST_ORDER],
        queryFn: async () => {
            const response = spreadSDK.genLastOrder();
            return response;
        },
        refetchInterval: 2000,
        enabled: wallet != null && spreadSDK.isInitialized() && isConnected,
    });
};
