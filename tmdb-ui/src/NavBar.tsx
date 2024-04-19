import React, { useState } from 'react';
import './NavBar.css'; // Import the CSS file

interface NavBarProps {
    onTabChange: (query: number) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onTabChange }) => {
    const [activeTab, setActiveTab] = useState<number>(1);

    const handleTabClick = (query: number) => {
        setActiveTab(query);
        onTabChange(query);
    };

    return (
        <div className="nav-bar">
            <div className={`tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)}>
                Query 1
            </div>
            <div className={`tab ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)}>
                Query 2
            </div>
            <div className={`tab ${activeTab === 3 ? 'active' : ''}`} onClick={() => handleTabClick(3)}>
                Query 3
            </div>
            <div className={`tab ${activeTab === 4 ? 'active' : ''}`} onClick={() => handleTabClick(4)}>
                Query 4
            </div>
            {/*<div className={`tab ${activeTab === 5 ? 'active' : ''}`} onClick={() => handleTabClick(5)}>*/}
            {/*    Query 5*/}
            {/*</div>*/}
        </div>
    );
};

export default NavBar;