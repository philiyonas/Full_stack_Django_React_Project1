import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

/**
 * ProtectedRoute component to guard routes that require authentication.
 * Checks for a valid access token and attempts to refresh it if expired.
**/

function ProtectedRoute({ children }) {

    const [isAuthorized, setIsAuthorized] = useState(null); // null means loading, true authorized, false not authorized

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false)); // In case of any error during auth, set isAuthorized to false 
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const response = await api.post("/auth/refresh/", { token: refreshToken }); // response.data => { accessToken, refreshToken }
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
                if (response.data.refreshToken) {
                    localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
                }
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }

        } catch (error) {
            console.error("Failed to refresh token", error);
            setIsAuthorized(false);
        }

    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const currentTime = Date.now() / 1000; // in seconds
        if (tokenExpiration < currentTime) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };


    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }
    return isAuthorized ? children : <Navigate to="/login" />;

};
export default ProtectedRoute;