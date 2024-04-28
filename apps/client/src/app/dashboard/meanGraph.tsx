import { Graph } from '@/app/dashboard/graph';
import { Button } from '@/components';
import { useSpreadMeanGraphQuery } from '@/queries';
import { getSharedGraphOptions } from '@/utils/';
import { SpreadGraphQueryParams } from '@ituspreadtrading/sdk';
import { Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';

export const SpreadMeanGraph = () => {
    const [range, setRange] = useState<SpreadGraphQueryParams['range']>('1m');
    const { data } = useSpreadMeanGraphQuery({
        symbol: 'BNBUSDT',
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
        <div className="flex space-x-2">
            {options.map((item) => (
                <Button
                    variant={item === range ? 'default' : 'ghost'}
                    key={item}
                    onClick={() => setRange(item)}
                >
                    {item}
                </Button>
            ))}
        </div>
    );
};
