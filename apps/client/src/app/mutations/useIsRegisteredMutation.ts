import { apiGetIsRegistered } from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

export const useIsRegisteredMutation = () => {
    return useMutation({
        mutationFn: async (address: string) => {
            return (await apiGetIsRegistered(address)).data.isRegistered;
        },
    });
};
