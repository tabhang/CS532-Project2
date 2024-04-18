import React from 'react';
import Chart from 'react-google-charts';

interface BarChartProps {
    data: Array<Array<string | number>>;
    options?: object;
    width?: string | number;
    height?: string | number;
}

const GraphPlot: React.FC<BarChartProps> = ({ data, options, width, height }) => {
    return (
        <Chart
            width={width || '100%'}
            height={height || '90%'}
            chartType="BarChart"
            loader={<div> Loading Chart</div>}
            data={data}
            options={options}
        />
    );
};

export default GraphPlot;
