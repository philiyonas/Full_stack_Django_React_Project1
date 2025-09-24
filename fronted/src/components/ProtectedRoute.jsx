import {Navigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import React from "react";
import api from "../api";
import {REFRESH_TOKEN, ACCESS_TOKEN} from "../constants";
import { useState, useEffect } from "react";

/**
 * ProtectedRoute component to guard routes that require authentication.
 * Checks for a valid access token and attempts to refresh it if expired.
**/

function ProtectedRoute({children}){

    const[isAutorized, setIsAuthorized]=useState(null); // null means loading, true means authorized, false means not authorized
    
    useEffect(() => {
        auth().catch(()=> setIsAuthorized(false)) // In case of any error during auth, set isAuthorized to false 
    }, []);

    const refreshToken = async() => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            // POST the stored refresh token to the backend refresh endpoint;
            // the endpoint should return a new accessToken and (optionally) a new refreshToken
            const response = await api.post("/auth/refresh/", { token: refreshToken }); // response.data => { accessToken, refreshToken }
            if (response.status === 200) {
                // If the refresh was successful, update the tokens in localStorage
                localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
                localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false);
            }
            
        } catch (error) {
            console.error("Failed to refresh token", error);
            setIsAuthorized(false);
        }
        
    };

    const auth = async() => { 
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return
        }
        
        const decoded = jwtDecode 
        const tokenExpiration = decoded.exp
        const currentTime = Date.now() / 1000; // in seconds
        if (tokenExpiration < currentTime) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        } 
    };
    

    if(isAutorized === null){
        return <div>Loading...</div>
    }
    return isAutorized ? children : <Navigate to="/login" />;

};
export default ProtectedRoute;