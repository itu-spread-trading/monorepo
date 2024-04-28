import { Graph } from '@/app/dashboard/graph';
import { Button } from '@/components';
import { useSpreadGraphQuery } from '@/queries';
import { getSharedGraphOptions } from '@/utils';
import { SpreadGraphQueryParams } from '@ituspreadtrading/sdk';
import { Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';

export const SpreadCandleStickGraph = () => {
    const [interval, setInterval] =
        useState<SpreadGraphQueryParams['interval']>('4h');

    const { data } = useSpreadGraphQuery({
        symbol: 'BNBUSDT',
        interval,
    });

    const memoizedSeries = useMemo(() => {
        if (data == null) return [];

        const seriesData = data.map((item) => {
            return {
                x: new Date(item.date).getTime(),
                y: [item.open, item.high, item.low, item.close],
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
                type: 'candlestick',
            },
        };
    }, []);

    return (
        <Graph
            title="Spread"
            rightEl={<RightEl interval={interval} setInterval={setInterval} />}
        >
            <Chart
                type="candlestick"
                series={memoizedSeries}
                options={options}
            />
        </Graph>
    );
};

const RightEl = ({
    setInterval,
    interval,
}: {
    setInterval: Dispatch<SetStateAction<SpreadGraphQueryParams['interval']>>;
    interval: SpreadGraphQueryParams['interval'];
}): ReactNode => {
    const options = ['1h', '4h', '1d'] as const;

    return (
        <div className="flex space-x-2 bg-gray-700 p-1 rounded-lg">
            {options.map((item) => (
                <Button
                    variant={item === interval ? 'default' : 'ghost'}
                    key={item}
                    onClick={() => setInterval(item)}
                >
                    {item}
                </Button>
            ))}
        </div>
    );
};
