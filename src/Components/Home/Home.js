import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Gear from './../Gear/Gear';

const Home = () => {
    const [gearsData, setGearsData] = useState([])
    useEffect(() => {
        fetch("https://murmuring-journey-90422.herokuapp.com/gears")
            .then(res => res.json())
            .then(data => setGearsData(data))
            .catch(err => console.log(err))
    }, [])
    return (
        <div className="container">
            <Header></Header>
            <div className="row">
                {
                    gearsData.length === 0 && <div className="text-center mt-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }
                {
                    gearsData.map(gear => <Gear key={gear._id} gear={gear} ></Gear>)
                }
            </div>
        </div>
    );
};

export default Home;