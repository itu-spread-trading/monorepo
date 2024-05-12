import { BuyCard } from '@/app/dashboard/buycard';
import { SellCard } from '@/app/dashboard/sellcard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components';
import { useMarketDataContext } from '@/context';
import { useSpreadStandardDeviation } from '@/queries';
import { useTokenPair } from '@/store';
import { ReactNode } from 'react';

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
