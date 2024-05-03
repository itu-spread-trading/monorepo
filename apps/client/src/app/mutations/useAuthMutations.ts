import { AuthDto } from '@/types';
import { apiPostLogin, apiPostRegister } from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: async (dto: AuthDto) => {
            return (await apiPostLogin(dto)).data;
        },
    });
};

export const useRegisterMutation = () => {
    return useMutation({
        mutationFn: async (dto: AuthDto) => {
            return (await apiPostRegister(dto)).data;
        },
    });
};
