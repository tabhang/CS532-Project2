import React, { useState, useEffect } from 'react';
import GraphComponent from './GraphComponent';
import GraphPlot from "./GraphPlot"; // Import the GraphComponent
// import './QueryContent.css';

interface QueryContentProps {
    query: string;
}

const QueryContent: React.FC<QueryContentProps> = ({ query }) => {

    const [graphData, setGraphData] = useState<any>(null); // You might want to replace 'any' with a more specific type

    const  [chartOptions ,setChartOptions] = useState<any>(null);
    /**
     * This is test data TBD
     */
    const chartData1 = [
        ['Year', 'Sales', 'Expenses'],
        ['2016', 1000, 1],
        ['2017', 1170, 1],
        ['2018', 660, 1],
        ['2019', 1030, 1],
    ];

    /**
     * Above is Test data TBD
     */
    useEffect(() => {
        const fetchGraphData = async () => {
            let newdata;
            try {
                const response = await fetch(`http://127.0.0.1:5000/data/${query}`);
                const data = await response.json();
                const list = data.result
                if (query == '5') {
                    let chartData = list.slice(1).map((row: any[]) => {
                        const genre = row[0];
                        const rating = row[1] * 1000;
                        const revenue = row[2] * 0.0001;
                        return [genre, rating, revenue];
                    })
                    const chartRows = chartData.map((row: any[]) => [row[0], row[1], row[2]]);
                    const chartHeader = ['Genre', 'Avg Rating', 'Avg Revenue'];
                    newdata = [chartHeader, ...chartRows]
                    const options = {
                        title: ' Revenue, Genres, and User rating Trends',
                        hAxis: { title: 'Avg Revenue * 10000 , Avg Rating / 1000', titleTextStyle: { color: '#333' } },
                        vAxis: { title: 'Genre'  },
                    };
                    setGraphData(newdata);

                    setChartOptions(options);
                }
                if (query == '4') {
                    newdata = [
                        ['Year', 'Sales', 'Expenses'],
                        ['2016', 1000, 1],
                        ['2017', 1170, 1],
                        ['2018', 660, 1],
                        ['2019', 1030, 1],
                    ]
                    setGraphData(newdata);
                }

            } catch (error) {
                console.error('Error fetching graph data:', error);
            }
        };

        fetchGraphData();
    }, [query]);

    return (
        <div className="query-content">
            <div style={{width: '100%'}}>
                <h2 style={{textAlign: 'center'}}> Description for Query {query} </h2>
                <p> Random stuffs {query}</p>
            </div>

            <div>
                <GraphPlot data={graphData} options={chartOptions} height={600} width={1000}/>
            </div>
        </div>


    );
};

export default QueryContent;