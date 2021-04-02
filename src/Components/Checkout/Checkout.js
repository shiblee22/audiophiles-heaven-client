import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";
import Header from '../Header/Header';
import { UserContext } from './../../App';

const Checkout = () => {
    const { id } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [gear, setGear] = useState({});
    const { gearName, price, type } = gear;
    const history = useHistory();

    useEffect(() => {
        fetch(`https://murmuring-journey-90422.herokuapp.com/gear/${id}`)
            .then(res => res.json())
            .then(data => setGear(data))
    }, [id])

    const handleOrder = () => {
        const orderInfo = {
            ...loggedInUser,
            gear: gearName,
            cost: price,
            date: new Date(),
            quantity: 1
        }

        fetch('https://murmuring-journey-90422.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    history.push('/orders')
                }
            })

    }

    return (
        <div className="container">
            <Header></Header>
            <h3 className="mt-3 text-center">Checkout</h3>
            <div className="lightgray-box p-2 mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{gearName}</td>
                            <td>{type}</td>
                            <td>1</td>
                            <td>{price}</td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th>Total</th>
                            <th></th>
                            <th></th>
                            <th>{price}</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="text-end mt-3">
                <button className="btn btn-warning" onClick={handleOrder}>Confirm Order</button>
            </div>
        </div>
    );
};

export default Checkout;