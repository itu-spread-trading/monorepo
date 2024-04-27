import { getFormattedDateTime } from '@/utils/date';
import { SpreadCandleResponse } from '@ituspreadtrading/sdk';
import { useMemo } from 'react';
import Chart from 'react-apexcharts';

type Props = {
    data: Array<SpreadCandleResponse>;
};

export const SpreadGraph = ({ data }: Props) => {
    const memoizedSeries = useMemo(() => {
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
        return {
            chart: {
                height: 600,
                type: 'candlestick',
                background: 'black',
            },
            theme: {
                mode: 'dark',
                palette: 'palette2',
                monochrome: {
                    enabled: true,
                    color: '#255aee',
                    shadeTo: 'dark',
                    shadeIntensity: 0.65,
                },
            },
            title: {
                text: 'CandleStick Chart - Category X-axis',
                align: 'left',
            },
            tooltip: {
                enabled: true,
                style: {
                    fontSize: '12px',
                },
            },
            xaxis: {
                type: 'category',
                labels: {
                    formatter: function (value) {
                        return getFormattedDateTime(value);
                    },
                    style: {
                        colors: 'gray',
                        fontSize: '12px',
                    },
                    show: false,
                },
                tooltip: {
                    enabled: true,
                },
            },
            yaxis: {
                tooltip: {
                    enabled: true,
                },
                show: false,
            },
        };
    }, []);

    return (
        <div
            style={{
                width: 760,
            }}
        >
            <Chart
                type="candlestick"
                series={memoizedSeries}
                height={360}
                options={options}
            />
        </div>
    );
};
