import { Graph } from '@/app/dashboard/graph';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSpreadMeanGraphQuery } from '@/queries';
import { useTokenPair } from '@/store';
import { getSharedGraphOptions } from '@/utils/';
import { SpreadGraphQueryParams } from '@ituspreadtrading/sdk';
import { Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';

export const SpreadMeanGraph = () => {
    const [range, setRange] = useState<SpreadGraphQueryParams['range']>('1w');
    const tokenPair = useTokenPair();
    const { data } = useSpreadMeanGraphQuery({
        symbol: tokenPair,
        range,
    });

    const memoizedSeries = useMemo(() => {
        if (data == null) {
            return [];
        }

        const seriesData = data.map((item) => {
            return {
                x: new Date(item.date).getTime(),
                y: [item.value],
            };
        });

        return [
            {
                data: seriesData,
            },
        ];
    }, [data]);

    const options = useMemo((): ApexCharts.ApexOptions => {
        const sharedOptions = getSharedGraphOptions();
        return {
            ...sharedOptions,
            chart: {
                ...sharedOptions.chart,
                type: 'line',
            },
            stroke: {
                curve: 'smooth',
            },
            colors: ['#ffffff'],
            fill: {
                colors: ['#ffffff'],
            },
        };
    }, []);

    return (
        <Graph
            title="Mean Reversion"
            rightEl={<RightEl setRange={setRange} range={range} />}
        >
            <Chart type="line" series={memoizedSeries} options={options} />
        </Graph>
    );
};

const RightEl = ({
    setRange,
    range,
}: {
    setRange: Dispatch<SetStateAction<SpreadGraphQueryParams['range']>>;
    range: SpreadGraphQueryParams['range'];
}): ReactNode => {
    const options = ['1d', '1w', '1m'] as const;

    return (
        <Tabs defaultValue={range} className="flex ml-auto">
            <TabsList>
                {options.map((option) => (
                    <TabsTrigger
                        value={option}
                        key={option}
                        onClick={() => setRange(option)}
                    >
                        {option}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
};
