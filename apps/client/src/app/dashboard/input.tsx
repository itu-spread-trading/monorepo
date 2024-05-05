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
import { useSpreadStandardDeviation } from '@/queries';
import { useTokenPair } from '@/store';
import {
    getRecommendedSpreadBuyValue,
    getRecommendedSpreadSellValue,
} from '@/utils';
import { ReactNode, useState } from 'react';

export const SellAndBuyInput = (): ReactNode => {
    const tokenPair = useTokenPair();
    const { spread } = useMarketDataContext();
    const { data: sd } = useSpreadStandardDeviation({
        symbol: tokenPair,
    });

    const [sellSpread, setSellSpread] = useState(0);
    const [buySpread, setBuySpread] = useState(0);

    const [sellSize, setSellSize] = useState(0);
    const [buySize, setBuySize] = useState(0);

    return (
        <Tabs defaultValue="sell" className="w-[100%]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sell">Sell</TabsTrigger>
                <TabsTrigger value="buy">Buy</TabsTrigger>
            </TabsList>
            <TabsContent value="sell">
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
                                        setSellSpread(Number(e.target.value));
                                    }}
                                    className="h-10 w-[100%]"
                                    id="spread"
                                    type="number"
                                />
                            </div>
                            <Button
                                onClick={() => {
                                    setSellSpread(
                                        getRecommendedSpreadSellValue(
                                            spread,
                                            sd,
                                        ),
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
                                onChange={(e) =>
                                    setSellSize(Number(e.target.value))
                                }
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
            </TabsContent>
            <TabsContent value="buy">
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
                                        getRecommendedSpreadBuyValue(
                                            spread,
                                            sd,
                                        ),
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
                                onChange={(e) =>
                                    setBuySize(Number(e.target.value))
                                }
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
            </TabsContent>
        </Tabs>
    );
};
