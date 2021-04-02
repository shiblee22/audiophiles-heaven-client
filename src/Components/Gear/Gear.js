import React from 'react';
import './Gear.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Gear = (props) => {
    const { _id, gearName, type, price, imgUrl } = props.gear;
    return (
        <div className="col-sm-12 col-md-6 col-lg-4 mt-3">
            <div className="card h-100 shadow gear-card">
                <div className="m-3 p-3 lightgray-box">
                    <img src={imgUrl} className="card-img-top img-fluid gear-image" alt="..." />
                </div>
                <div className="px-3">
                    <h5 className="card-title gear-name">{gearName}</h5>
                    <p className="card-text">{type}</p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center gear-footer">
                    <h5 className="price-tag">$ {price}</h5>
                    <Link to={`/checkout/${_id}`} className="btn buy-button py-3 px-5"><FontAwesomeIcon icon={faShoppingCart} /> Buy
                                Now</Link>
                </div>
            </div>
        </div>
    );
};

export default Gear;