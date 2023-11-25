

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./style.css";
const ClockComponent = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [currentTime, setCurrentTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    const fetchTime = () => {
        axios.get(`http://worldtimeapi.org/api/timezone/${selectedCountry}`)
            .then(response => {
                setCurrentTime(response.data.unixtime);
            })
            .catch(error => console.error('Error fetching time:', error));
    };

    useEffect(() => {

        axios.get('http://worldtimeapi.org/api/timezone')
            .then(response => {
                setCountries(response.data);

                setSelectedCountry(response.data[0]);
            })
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    useEffect(() => {

        const intervalId = setInterval(() => {
            if (isRunning) {
                fetchTime();
            }
        }, 1000);


        return () => clearInterval(intervalId);
    }, [selectedCountry, isRunning]);

    const handleCountryChange = (event) => {
        const newCountry = event.target.value;
        setSelectedCountry(newCountry);

        fetchTime();
    };

    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className='clock'>
            <div>
                <select value={selectedCountry} onChange={handleCountryChange}>
                    {countries.map(country => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <p>Current Time: {formatTime(currentTime)}</p>
                <div className='btn'>
                    <div className='one'> <button onClick={handleStart}>Start</button></div>

                    <div className='one'> <button onClick={handlePause}>Pause</button></div>
                </div>
            </div>
        </div>
    );
};

export default ClockComponent;

