import { useToast } from '@/components/ui/use-toast';
import { useApproveUSDT } from '@/utils/wallet';
import { useMutation } from '@tanstack/react-query';

export const useApproveUSDTMutation = (onSuccess?: () => void) => {
    const { toast } = useToast();

    const approveUsdt = useApproveUSDT();
    const approveUSDTMutation = useMutation({
        mutationFn: approveUsdt,
        onSuccess: () => {
            toast({
                title: 'Successfully Approved',
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

    return approveUSDTMutation;
};
