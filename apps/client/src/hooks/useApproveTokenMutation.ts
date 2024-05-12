import { useToast } from '@/components/ui/use-toast';
import { useApproveToken } from '@/utils/wallet';
import { useMutation } from '@tanstack/react-query';

export const useApproveTokenMutation = (onSuccess?: () => void) => {
    const { toast } = useToast();

    const approveToken = useApproveToken();
    const approveTokenMutation = useMutation({
        mutationFn: approveToken,
        onSuccess: () => {
            toast({
                title: 'Successfully Approved USDT',
            });
            onSuccess?.();
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
