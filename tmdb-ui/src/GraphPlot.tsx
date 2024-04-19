import React from 'react';
import Chart from 'react-google-charts';

interface BarChartProps {
    data: Array<Array<string | number>>;
    options?: object;
    width?: string | number;
    height?: string | number;
    chartType?: string|undefined;
}

const GraphPlot: React.FC<BarChartProps> = ({ data, options, width, height,chartType  }) => {

  if (chartType == 'BarChart'){
      return (
          <Chart
              width={width || '100%'}
              height={height || '90%'}
              loader={<div> Loading Chart</div>}
              data={data}
              options={options}
              chartType={'BarChart'}/>
      );
  } else if (chartType == 'BubbleChart') {
      return (
          <Chart
              width={width || '100%'}
              height={height || '90%'}
              loader={<div> Loading Chart</div>}
              data={data}
              options={options}
              chartType={'BubbleChart'}/>
      );

      }
  else if (chartType == 'Bar') {
      return (
          <Chart
              width={width || '100%'}
              height={height || '90%'}
              loader={<div> Loading Chart</div>}
              data={data}
              options={options}
              chartType={'Bar'}/>
      );

  }else if (chartType == 'Column') {
      return (
          <Chart
              width={width || '100%'}
              height={height || '90%'}
              loader={<div> Loading Chart</div>}
              data={data}
              options={options}
              chartType={'ColumnChart'}/>
      );

  }else{
              return (
              <Chart
                  width={width || '100%'}
                  height={height || '90%'}
                  loader={<div> Loading Chart</div>}
                  data={data}
                  options={options}
                  chartType={'Sankey'}/>
          );
      }
};

export default GraphPlot;
