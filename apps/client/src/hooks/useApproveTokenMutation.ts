import { useToast } from '@/components/ui/use-toast';
import { useApproveToken } from '@/utils/wallet';
import { UseMutationResult, useMutation } from '@tanstack/react-query';

export const useApproveTokenMutation = (
    onSuccess?: () => void,
): UseMutationResult<void, Error, string, unknown> => {
    const { toast } = useToast();

    const approveToken = useApproveToken();
    const approveTokenMutation = useMutation({
        mutationFn: approveToken,
        onSuccess: () => {
            toast({
                title: 'Successfully Approved USDT',
            });
            setTimeout(() => {
                onSuccess?.();
            }, 1000);
        },
        onError: (err) => {
            toast({
                title: 'Failed to Approve',
                description: err?.message,
            });
        },
    });

    return approveTokenMutation;
};
