import {
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    Input,
    Label,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components';
import { useToast } from '@/components/ui/use-toast';
import { useMarketDataContext } from '@/context';
import { useGetTokenAmountFromUSD } from '@/hooks/useGetTokenAmountFromUSD';
import { useHandleConnection } from '@/hooks/useHandleConnection';
import { useSpreadStandardDeviation } from '@/queries';
import { useOneInchTokenPair, useTokenPair, useWallet } from '@/store';
import {
    getRecommendedSpreadBuyValue,
    getRecommendedSpreadSellValue,
    spreadSDK,
} from '@/utils';
import { ERC20ABI } from '@/utils/erc20abi';
import { useApproveToken } from '@/utils/wallet';
import { formatSpreadSDKSymbolTo1inchToken } from '@ituspreadtrading/sdk';
import { useMutation } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useAccount, useConnect, useReadContract } from 'wagmi';
import { injected } from 'wagmi/connectors';

type CardProps = {
    spread: number;
    sd: number;
};

export const SellAndBuyInput = (): ReactNode => {
    const tokenPair = useTokenPair();
    const { spread } = useMarketDataContext();
    const { data: sd } = useSpreadStandardDeviation({
        symbol: tokenPair,
    });

    return (
        <Tabs defaultValue="sell" className="w-[100%]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sell">Sell</TabsTrigger>
                <TabsTrigger value="buy">Buy</TabsTrigger>
            </TabsList>
            <TabsContent value="sell">
                <SellCard spread={spread} sd={sd} />
            </TabsContent>
            <TabsContent value="buy">
                <BuyCard spread={spread} sd={sd} />
            </TabsContent>
        </Tabs>
    );
};

const SellCard = ({ sd, spread }: CardProps) => {
    const tokenPair = useTokenPair();
    const wallet = useWallet();
    const { isConnected } = useAccount();
    const { connect } = useConnect();
    const [sellSpread, setSellSpread] = useState(0);
    const [sellSize, setSellSize] = useState(0);

    const handleConnection = useHandleConnection({
        delay: 0,
    });
    const { toast } = useToast();

    const { getTokenAmountFromUSD, getParsedAmount } =
        useGetTokenAmountFromUSD();
    const parsedSellSize = getParsedAmount(sellSize).toString();
    const approveToken = useApproveToken();
    const oneInchTokenPair = useOneInchTokenPair();

    const { data: allowance, refetch } = useReadContract({
        account: wallet?.associatedAddress as `0x${string}`,
        abi: ERC20ABI,
        address: oneInchTokenPair.TOKEN as `0x${string}`,
        functionName: 'allowance',
        args: [
            wallet?.associatedAddress as `0x${string}`,
            oneInchTokenPair.TOKEN as `0x${string}`,
        ],
    });

    const approveTokenMutation = useMutation({
        mutationFn: approveToken,
        onSuccess: () => {
            toast({
                title: 'Successfully Approved',
            });
            refetch();
        },
        onError: (err) => {
            toast({
                title: 'Failed to Approve',
                description: err?.message,
            });
        },
    });

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
                return {
                    disabled: false,
                    children: zeroAllowance
                        ? `Approve ${formatSpreadSDKSymbolTo1inchToken(
                              tokenPair,
                          )}`
                        : 'Submit',
                    onClick: async () => {
                        if (zeroAllowance) {
                            approveTokenMutation.mutate();
                        } else {
                            const limitOrderResponse =
                                await spreadSDK.orderbook.genCreateLimitOrder({
                                    sdkType: '1inch',
                                    makerAsset: ethers.constants.AddressZero,
                                    takerAsset: ethers.constants.AddressZero,
                                    maker: ethers.constants.AddressZero,
                                    makingAmount: parsedSellSize,
                                    takingAmount: '100',
                                });
                            alert(JSON.stringify(limitOrderResponse));
                        }
                    },
                    loading: approveTokenMutation.isPending,
                };
            }
        }
    }, [
        wallet,
        sellSize,
        allowance,
        tokenPair,
        approveTokenMutation.isPending,
        isConnected,
        parsedSellSize,
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
                                setSellSpread(e.target.value as any);
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
                            setSellSize(e.target.value as any);
                        }}
                        className="h-10 w-[100%]"
                        id="size"
                        type="number"
                    />
                </div>

                <div className="space-y-1 w-full">
                    <Label htmlFor="spread">
                        Estimated amount{' '}
                        {formatSpreadSDKSymbolTo1inchToken(tokenPair)}
                    </Label>
                    <Input
                        disabled={true}
                        value={getTokenAmountFromUSD(sellSize)}
                        className="h-10 w-[100%]"
                        id="size"
                        type="number"
                    />
                </div>

                <div className="space-y-1 w-full">
                    <Label htmlFor="spread">Parsed amount</Label>
                    <Input
                        disabled={true}
                        value={parsedSellSize}
                        className="h-10 w-[100%]"
                        id="size"
                        type="number"
                    />
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

const BuyCard = ({ sd, spread }: CardProps) => {
    const [buySpread, setBuySpread] = useState(0);
    const [buySize, setBuySize] = useState(0);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Buy Spread</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex space-x-1 items-end">
                    <div className="space-y-1 w-full">
                        <Label htmlFor="spread">Spread</Label>
                        <Input
                            value={buySpread}
                            onChange={(e) => {
                                setBuySpread(Number(e.target.value));
                            }}
                            className="h-10 w-[100%]"
                            id="spread"
                            type="number"
                        />
                    </div>
                    <Button
                        onClick={() => {
                            setBuySpread(
                                getRecommendedSpreadBuyValue(spread, sd),
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
                        value={buySize}
                        onChange={(e) => setBuySize(Number(e.target.value))}
                        className="h-10 w-[100%]"
                        id="size"
                        type="number"
                    />
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex flex-col w-full space-y-1">
                    <Button size="lg">Submit</Button>
                </div>
            </CardFooter>
        </Card>
    );
};
