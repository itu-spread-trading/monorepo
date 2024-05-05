import { SpreadCandleStickGraph } from '@/app/dashboard/candleGraph';
import { SpreadMeanGraph } from '@/app/dashboard/meanGraph';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components';

export const DashboardChart = () => {
    return (
        <Tabs defaultValue="spread" className="w-[100%] mt-2">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="spread">Spread</TabsTrigger>
                <TabsTrigger value="mean-reversion">Mean Reversion</TabsTrigger>
            </TabsList>
            <TabsContent value="spread">
                <SpreadCandleStickGraph />
            </TabsContent>
            <TabsContent value="mean-reversion">
                <SpreadMeanGraph />
            </TabsContent>
        </Tabs>
    );
};
