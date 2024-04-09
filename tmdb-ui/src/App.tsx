import React from 'react';
import './App.css';
import Header from './Header';
import MainContent from './MainContent';

const App: React.FC = () => {
    return (
        <div className="app">
            <Header />
            <MainContent />
        </div>
    );
};

export default App;