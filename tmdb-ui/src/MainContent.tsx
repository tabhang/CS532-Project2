import React, { useState } from 'react';
import NavBar from './NavBar';
import QueryContent from './QueryContent';
import './MainContent.css';

const MainContent: React.FC = () => {
    const [query, setQuery] = useState<number>(1);

    const handleTabChange = (query: number) => {
        setQuery(query);
    };

    return (
        <div className="main-content">
            <NavBar onTabChange={handleTabChange} />
            <QueryContent query={query.toString()} /> {/* Use QueryContent component */}
        </div>
    );
};

export default MainContent;