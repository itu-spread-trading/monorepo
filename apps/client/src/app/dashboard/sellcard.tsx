import {
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    Input,
    Label,
} from '@/components';
import { useToast } from '@/components/ui/use-toast';
import { useApproveTokenMutation } from '@/hooks/useApproveTokenMutation';
import { useApproveUSDTMutation } from '@/hooks/useApproveUSDTMutation';
import { useGetTokenAmountFromUSD } from '@/hooks/useGetTokenAmountFromUSD';
import { useHandleConnection } from '@/hooks/useHandleConnection';
import { useOneInchTokenPair, useTokenPair, useWallet } from '@/store';
import { getRecommendedSpreadSellValue, spreadSDK } from '@/utils';
import { TREASURY_ADDRESS, erc20Interface } from '@/utils/constants';
import {
    getWallet,
    useWalletTokenAllowance,
    useWalletUSDTAllowanceForSwap,
} from '@/utils/wallet';
import {
    SpreadSDKError,
    SpreadSDKOrderStatus,
    SpreadSDKOrderType,
    formatSpreadSDKSymbolTo1inchToken,
} from '@ituspreadtrading/sdk';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { BigNumber } from 'ethers';
import { useMemo, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

type CardProps = {
    spread: number;
    sd: number;
};

export const SellCard = ({ sd, spread }: CardProps) => {
    const tokenPair = useTokenPair();
    const wallet = useWallet();
    const { isConnected } = useAccount();
    const { connect } = useConnect();
    const [sellSpread, setSellSpread] = useState(0);
    const [sellSize, setSellSize] = useState(0);
    const { toast } = useToast();

    const handleConnection = useHandleConnection({
        delay: 0,
    });

    const { getFuturesTokenAmount, getFuturesUSDAmount, getParsedUSDTAmount } =
        useGetTokenAmountFromUSD();
    const oneInchTokenPair = useOneInchTokenPair();

    const { allowance, refetch: refetchTokenAllowance } =
        useWalletTokenAllowance();
    const { allowance: usdtAllowance, refetch: refetchUSDTAllowance } =
        useWalletUSDTAllowanceForSwap();

    const approveTokenMutation = useApproveTokenMutation(refetchTokenAllowance);
    const approveUSDTMutation = useApproveUSDTMutation(refetchUSDTAllowance);

    const sellMutation = useMutation({
        mutationFn: async () => {
            const limitOrder = await spreadSDK.orderbook.genCreateLimitOrder({
                sdkType: '1inch',
                makerAsset: oneInchTokenPair.TOKEN,
                takerAsset: oneInchTokenPair.USDT,
                maker: wallet.associatedAddress,
                makingAmount: estimatedFuturesAmount,
                takingAmount: estimatedUSDTAmount,
            });
            const swapParams = spreadSDK.swap.getSwapParams({
                inputToken: oneInchTokenPair.USDT,
                outputToken: oneInchTokenPair.TOKEN,
                amount: estimatedUSDTAmount,
            });
            let swapResponse;
            try {
                swapResponse = await spreadSDK.swap.genSwapCalldata(swapParams);
            } catch (err) {
                if (err instanceof AxiosError) {
                    toast({
                        title: 'Failed to swap',
                        description: err?.response?.data?.message,
                    });
                }
                throw err;
            }

            const sendMetaCalldata = erc20Interface.encodeFunctionData(
                'transfer',
                [TREASURY_ADDRESS, limitOrder.data.makingAmount],
            );

            const associatedWallet = getWallet();

            if (associatedWallet == null) {
                throw SpreadSDKError.NotInitialized();
            }

            const tx = await associatedWallet.sendTransaction({
                to: oneInchTokenPair.TOKEN,
                data: sendMetaCalldata,
                gasLimit: 1_000_000,
            });
            await tx?.wait();

            const metaCalldata = erc20Interface.encodeFunctionData('transfer', [
                wallet.associatedAddress,
                limitOrder.data.takingAmount,
            ]);

            const sellStartResponse = await spreadSDK.genStartSellSpread({
                calldata: limitOrder.calldata,
                metaCalldata,
                associatedLimitOrder: JSON.stringify(limitOrder.data),
                usdtAddress: oneInchTokenPair.USDT,
                address: spreadSDK.getPublicAddress(),
                contractAddress: spreadSDK.orderbook.getProtocolAddress(),
                spread: sellSpread,
                size: sellSize,
                type: SpreadSDKOrderType.SELL,
                symbol: tokenPair,
                tokenAmount: estimatedFuturesAmount,
            });

            if (sellStartResponse.status === SpreadSDKOrderStatus.FILLED) {
                const swapTx = await associatedWallet.sendTransaction({
                    to: swapResponse.tx.to,
                    data: swapResponse.tx.data,
                    value: BigNumber.from(0),
                });
                await swapTx.wait();
                await spreadSDK.genUpdateOrderById(sellStartResponse.id, {
                    status: SpreadSDKOrderStatus.COMPLETE,
                    associatedSwap: swapTx.hash,
                });
            }

            console.log('LIMITORDER', sellStartResponse);
        },
    });

    const estimatedFuturesAmount = getFuturesTokenAmount(
        sellSpread,
        sellSize,
    ).toString();

    const futuresUSDAmount = getFuturesUSDAmount(sellSpread);
    const estimatedUSDTAmount = getParsedUSDTAmount(sellSize).toString();
    const token = formatSpreadSDKSymbolTo1inchToken(tokenPair);

    const buttonProps = useMemo(() => {
        if (!isConnected) {
            return {
                disabled: false,
                children: 'Connect Wallet',
                onClick: () => {
                    connect({
                        connector: injected(),
                    });
                },
                loading: false,
            };
        } else if (wallet == null) {
            return {
                disabled: false,
                children: 'Connect Spread Wallet First',
                onClick: handleConnection,
                loading: false,
            };
        } else {
            if (!sellSize || sellSize <= 0) {
                return {
                    disabled: true,
                    children: 'Enter a size',
                    onClick: undefined,
                    loading: false,
                };
            } else {
                const zeroAllowance = allowance === 0n;
                const zeroUSDTAllowance = usdtAllowance === 0n;
                return {
                    disabled: false,
                    children: zeroAllowance
                        ? `Approve ${token}`
                        : zeroUSDTAllowance
                        ? 'Approve USDT for Swap'
                        : 'Submit',
                    onClick: async () => {
                        if (zeroAllowance) {
                            approveTokenMutation.mutate(
                                spreadSDK.orderbook.getProtocolAddress(),
                            );
                        } else if (zeroUSDTAllowance) {
                            approveUSDTMutation.mutate(
                                spreadSDK.swap.getRouterAddress(),
                            );
                        } else {
                            await sellMutation.mutateAsync();
                        }
                    },
                    loading:
                        approveTokenMutation.isPending ||
                        approveUSDTMutation.isPending ||
                        sellMutation.isPending,
                };
            }
        }
    }, [
        wallet,
        sellSize,
        allowance,
        tokenPair,
        usdtAllowance,
        approveTokenMutation.isPending,
        approveUSDTMutation.isPending,
        sellMutation.isPending,
        isConnected,
        estimatedFuturesAmount,
        estimatedUSDTAmount,
    ]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sell Spread</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex space-x-1 items-end">
                    <div className="space-y-1 w-full">
                        <Label htmlFor="spread">Spread</Label>
                        <Input
                            value={sellSpread}
                            onChange={(e) => {
                                setSellSpread(e.target.value as $fixme);
                            }}
                            className="h-10 w-[100%]"
                            id="spread"
                            type="number"
                        />
                    </div>
                    <Button
                        onClick={() => {
                            setSellSpread(
                                getRecommendedSpreadSellValue(spread, sd),
                            );
                        }}
                        size="lg"
                        variant="secondary"
                    >
                        Use recommended spread
                    </Button>
                </div>

                <div className="space-y-1 w-full">
                    <Label htmlFor="spread">Size ($)</Label>
                    <Input
                        value={sellSize}
                        onChange={(e) => {
                            setSellSize(e.target.value as $fixme);
                        }}
                        className="h-10 w-[100%]"
                        id="size"
                        type="number"
                    />
                </div>

                <div className="space-y-1 w-full">
                    <Label htmlFor="spread">Estimated futures price ($)</Label>
                    <Input
                        disabled={true}
                        value={futuresUSDAmount}
                        className="h-10 w-[100%]"
                        id="size"
                        type="number"
                    />
                </div>
                <div className="flex space-x-2">
                    <div className="space-y-1 w-full">
                        <Label htmlFor="spread">Parsed {token} amount</Label>
                        <Input
                            disabled={true}
                            value={estimatedFuturesAmount}
                            className="h-10 w-[100%]"
                            id="size"
                            type="number"
                        />
                    </div>
                    <div className="space-y-1 w-full">
                        <Label htmlFor="spread">Parsed USDT amount</Label>
                        <Input
                            disabled={true}
                            value={estimatedUSDTAmount}
                            className="h-10 w-[100%]"
                            id="size"
                            type="number"
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex flex-col w-full space-y-1">
                    <Button
                        loading={buttonProps.loading}
                        disabled={buttonProps.disabled}
                        onClick={buttonProps.onClick}
                        size="lg"
                    >
                        {buttonProps.children}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};
