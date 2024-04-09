import React, { useState, useEffect } from 'react';
import GraphComponent from './GraphComponent'; // Import the GraphComponent
// import './QueryContent.css';

interface QueryContentProps {
    query: string;
}

const QueryContent: React.FC<QueryContentProps> = ({ query }) => {

    const [graphData, setGraphData] = useState<any>(null); // You might want to replace 'any' with a more specific type

    useEffect(() => {
        const fetchGraphData = async () => {
            try {
                const response = await fetch(`YOUR_API_ENDPOINT/${query}`);
                const data = await response.json();
                setGraphData(data);
            } catch (error) {
                console.error('Error fetching graph data:', error);
            }
        };

        fetchGraphData();
    }, [query]);

    return (
        <div className="query-content">
            <h2>Description for Query {query}</h2>
            {graphData && <GraphComponent data={graphData} />}
        </div>
    );
};

export default QueryContent;