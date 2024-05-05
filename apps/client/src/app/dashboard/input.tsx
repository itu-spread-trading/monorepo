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
    TabsTrigger,
    TabsContent,
    TabsList,
} from '@/components';
import { useMarketDataContext } from '@/context';
import { useHandleConnection } from '@/hooks/useHandleConnection';
import { useSpreadStandardDeviation } from '@/queries';
import { useTokenPair, useWallet } from '@/store';
import {
    getRecommendedSpreadBuyValue,
    getRecommendedSpreadSellValue,
} from '@/utils';
import { ReactNode, useMemo, useState } from 'react';

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
    const wallet = useWallet();
    const [sellSpread, setSellSpread] = useState(0);
    const [sellSize, setSellSize] = useState(0);
    const handleConnection = useHandleConnection({
        delay: 0,
    });

    const buttonProps = useMemo(() => {
        if (wallet == null) {
            return {
                disabled: false,
                children: 'Connect Spread Wallet First',
                onClick: handleConnection,
            };
        } else {
            if (!sellSize) {
                return {
                    disabled: true,
                    children: 'Enter a size',
                    onClick: undefined,
                };
            } else {
                return {
                    disabled: false,
                    children: 'Submit',
                    onClick: () => {},
                };
            }
        }
    }, [wallet, sellSize]);

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
            </CardContent>
            <CardFooter>
                <div className="flex flex-col w-full space-y-1">
                    <Button
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
