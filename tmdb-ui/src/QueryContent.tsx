import React, { useState, useEffect } from 'react';
import GraphComponent from './GraphComponent';
import GraphPlot from "./GraphPlot";
// import './QueryContent.css';
import jsonData from './description.json'

interface QueryContentProps {
    query: string;
}

const QueryContent: React.FC<QueryContentProps> = ({ query }) => {

    const [graphData, setGraphData] = useState<any>(null);

    const  [chartOptions ,setChartOptions] = useState<any>(null);
    const  [chartType ,setChartType] = useState<string>();
    const [description, setDescription] = useState('');

    const DescriptionFetcher = async (keyToFind: any ) => {
        try {
            // @ts-ignore
            return jsonData[keyToFind] || 'Description not found';
        } catch (error) {
            console.error('Error fetching description:', error);
            return 'Error fetching description';
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const description = await DescriptionFetcher(query);
            setDescription(description);
        };

        fetchData();
    }, [query]);


    useEffect(() => {
        const fetchGraphData = async () => {
            let newdata;
            try {
                const response = await fetch(`http://127.0.0.1:5000/data/${query}`);
                const data = await response.json();
                const list = data.result
                //console.log(list)
                if (query == '4') {
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
                    setChartType("BarChart")
                    setChartOptions(options);
                }
                if (query == '3') {
                    const filteredMovies = list.filter((movie: { decade: number; }) => movie.decade !== 1910);
                    const sortedMovies = filteredMovies.sort((a: { decade: number; }, b: { decade: number; }) => a.decade - b.decade);

                    // @ts-ignore
                    const chartData = sortedMovies.map(({ decade, topGenres }) => {
                        const seriesData = topGenres.map((genre: { popularity: any; genre: any; }) => {
                            return { v: genre.popularity, f: `${genre.genre}: ${genre.popularity}` };
                        });
                        return [`${decade}`, ...seriesData];
                    });

                    const newdata = [['Decade', ...sortedMovies[0].topGenres.map((genre: { genre: any; }) => genre.genre)], ...chartData];



                    const options = {
                        title: 'Genre Popularity by Decade',
                        legend: {position: "none" },
                        hAxis: { title: 'Popularity', titleTextStyle: { color: '#333' } },
                        vAxis: { title: 'Decades'  },
                        bar: {groupWidth: "60%"}

                    }


                    setGraphData(newdata);
                    setChartType("Bar")
                    setChartOptions(options);

                }
                if (query == '2'){
                    const formattedData = ['From', 'To', 'Count','Revenue'];
                    const dataListFormatted = list.map((item: { cast: any; crew: any; count: any; avg_revenue: any }) => [item.cast, item.crew, item.count, item.avg_revenue]);
                    const newdata = [formattedData , ...dataListFormatted]
                    setGraphData(newdata);
                    var colors = ['#a6cee3', '#b2df8a', '#fb9a99', '#e3840a',
                        '#cab2d6', '#ffff99', '#1f78b4', '#33a02c'];
                    var options = {
                        height: 600,
                        width: 1000,
                        sankey: {
                            node: {
                                colors: colors,
                                label: {
                                    //fontName: 'Times-Roman',
                                    fontSize: 16
                                },
                            },
                            link: {
                                colorMode: 'gradient',
                                colors: colors
                            }
                        }
                    };

                    setChartType("Sankey")
                    setChartOptions(options);
                }

                if(query == '1'){
                    const header= ['ActorName','actorRating', 'successRating']
                    const dataListFormatted = list.map((item: { _id: any; actorRating: any; successRating: any }) => [item._id,item.actorRating, item.successRating,]);

                    const options = {
                        title: "Correlation between generated actor rating and success score",
                        hAxis: { title: "Actor Rating" },
                        vAxis: { title: "Success Score" },
                        bubble: { textStyle: { fontSize: 0.1 , fontColor: '#ffffff' } },
                        sizeAxis: { maxSize: 10 }
                    };
                    const newdata = [header , ...dataListFormatted];
                    setGraphData(newdata);
                    setChartType("BubbleChart")
                    setChartOptions(options);

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
                <h2 style={{textAlign: 'center'}}> Description </h2>
                <p>{description}</p>
            </div>

            <div>
                <GraphPlot data={graphData} options={chartOptions} height={600} width={1000} chartType={chartType}/>
            </div>
        </div>


    );
};

export default QueryContent;