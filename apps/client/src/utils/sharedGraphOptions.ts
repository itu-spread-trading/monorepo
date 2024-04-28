import { getFormattedDateTime } from '@/utils/date';
import { ApexOptions } from 'apexcharts';

export const getSharedGraphOptions = (): ApexOptions => {
    return {
        chart: {
            background: 'transparent',
            height: 400,
        },
        theme: {
            mode: 'dark',
            palette: 'palette1',
            monochrome: {
                enabled: true,
                color: '#255aee',
                shadeTo: 'dark',
                shadeIntensity: 0.65,
            },
        },
        title: {
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
        grid: {
            yaxis: {
                lines: {
                    show: false,
                },
            },
        },
    };
};
