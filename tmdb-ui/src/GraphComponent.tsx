import React from 'react';
import { Bar } from 'react-chartjs-2';

interface GraphComponentProps {
    data: { x: number; y: number }[];
}

const GraphComponent: React.FC<GraphComponentProps> = ({ data }) => {
    // Transform data for chart.js format
    const chartData = {
        labels: data.map(point => point.x),
        datasets: [
            {
                label: 'Data',
                data: data.map(point => point.y),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <Bar data={chartData} />
        </div>
    );
}

export default GraphComponent;