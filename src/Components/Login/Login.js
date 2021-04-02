import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import "./Login.css";
import googleicon from "../../images/google.png";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
    const [ loggedInUser, setLoggedInUser ] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email} 
            setLoggedInUser(signedInUser);
            history.replace(from);
          }).catch(function(error) {
            const errorMessage = error.message;
            console.log(errorMessage);
          });
    }
    return (
        <div className="container">
            <h1>Audiophiles Heaven</h1>
            <h3 className="text-center mt-3">Login</h3>
            <div className="signin-button mx-auto mt-5" onClick={handleGoogleSignIn}><img className="signin-img" src={googleicon} alt=""/><h5 className="mx-auto">Login with Google</h5></div>
        </div>
    );
};

export default Login;