import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ManageGear = () => {
    const [gearsData, setGearsData] = useState([])

    useEffect(() => {
        fetch("https://murmuring-journey-90422.herokuapp.com/gears")
            .then(res => res.json())
            .then(data => setGearsData(data))
            .catch(err => console.log(err))
    }, [])

    const deletegear = (e, id) => {
        fetch(`https://murmuring-journey-90422.herokuapp.com/deleteGear/${id}`, {
            method: 'DELETE'
        }).then(() => {
            e.target.parentNode.parentNode.style.display = 'none';
        }).catch(err => {
            console.error(err)
        });
    }

    return (
        <div className="container mt-3">
            <h3>Manage Gears</h3>
            {
                gearsData.length === 0 && <div className="text-center mt-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
            <div className="lightgray-box p-2 mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Gear Name</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            gearsData.map(gear =>
                                <tr key={gear._id}>
                                    <td>{gear.gearName}</td>
                                    <td>{gear.type}</td>
                                    <td>{gear.price}</td>
                                    <td><button className="btn-danger rounded" onClick={(e) => { deletegear(e, gear._id) }}><FontAwesomeIcon icon={faTrashAlt} /></button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageGear;