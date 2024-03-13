import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('/listproduct');
    };

    return (
        <div className="container">
            <h1 className="text">Welcome to POS-System</h1>
            <button className="button" onClick={handleStartClick}>
                Start
            </button>
        </div>
    );
};

export default HomePage;
