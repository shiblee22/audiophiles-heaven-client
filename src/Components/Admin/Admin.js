import React from 'react';
import {Switch, Link, useRouteMatch} from "react-router-dom";
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import AddGear from './../AddGear/AddGear';
import ManageGear from './../ManageGear/ManageGear';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faThLarge } from '@fortawesome/free-solid-svg-icons';

const Admin = () => {
    let { path, url } = useRouteMatch();
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-12">
                    <nav className="nav flex-column  bg-success rounded" style={{minHeight:"100vh"}}>
                        <Link className="nav-link text-light fs-2" to="/">Audiophiles Heaven</Link>
                        <Link className="nav-link text-light fs-5" to={`${url}`}><FontAwesomeIcon icon={faThLarge} /> Manage Gears</Link>
                        <Link className="nav-link text-light fs-5" to={`${url}/addGear`}><FontAwesomeIcon icon={faPlus} /> Add Gear</Link>
                    </nav>
                </div>
                <div className="col-lg-8 col-12">
                    <Switch>
                        <PrivateRoute exact path={`${path}`}>
                            <ManageGear></ManageGear>
                        </PrivateRoute>
                        <PrivateRoute path={`${path}/addGear`}>
                            <AddGear></AddGear>
                        </PrivateRoute>
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default Admin;