/** forms to be used for regesration and login **/

import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom"; // hooks that allows us to access the navigaation from code  
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");// state to manage username input
    const [password, setPassword] = useState(""); // state to manage password input
    const [loading, setLoading] = useState(false); // state to manage loading indicator
    const navigate = useNavigate(); // gives us access to the navigation function

    const name = method === "login" ? "Login" : "Register"; // determine form name based on method prop

    const handleSubmit = async (e) => { // function to handle form submission
        setLoading(true);  // show loading indicator
        e.preventDefault(); // prevent default form submission behavior

// make API call to the specified route with username and password
        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };
// render the form with input fields and submit button 
    return (
        <form onSubmit={handleSubmit} className="form-container"> 
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username} 
                onChange={(e) => setUsername(e.target.value)} // update username state on input change
                placeholder="Username" 
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}//
                placeholder="Password"
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
    );
}

export default Form