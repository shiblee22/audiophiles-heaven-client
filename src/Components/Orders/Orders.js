import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import { UserContext } from './../../App';

const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { email, name } = loggedInUser
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`https://murmuring-journey-90422.herokuapp.com/orders/${email}`)
            .then(res => res.json())
            .then(data => {
                const orders = data.reverse();
                setOrders(orders)
            })
    }, [email])

    return (
        <div className="container">
            <Header></Header>
            <div className="mt-5 d-flex align-items-end text-secondary">
                <h3>Hello! {name}</h3>
                <h5 className="mx-3">Here's your orders list</h5>
            </div>
            <div className="lightgray-box p-2 mt-3">
                <table className="table">
                    <thead>
                        <tr><th>No.</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Cost</th>
                            <th>Order Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((od, index) =>
                                <tr key={od._id}>
                                    <td>{index + 1}</td>
                                    <td>{od.gear}</td>
                                    <td>{od.quantity}</td>
                                    <td>{od.cost}</td>
                                    <td>{new Date(od.date).toLocaleDateString("en-BD")}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;