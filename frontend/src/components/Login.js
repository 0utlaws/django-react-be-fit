import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import AuthAPI from "../api/AuthAPI";
import { useCookies} from "react-cookie";

const Login = () => {
    const [token, setToken] = useCookies(['mr-token']);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    useEffect(() => {
        if(token['mr-token']) window.location.href = "/panel";
    }, [token]);

    const handleLoginClick = () => {
        AuthAPI.userLogin({
            username,
            password
        })
        .then(response => setToken('mr-token', response.token))
        .catch(error => console.log(error))
    };

    return (
        <div className="login-form">
            <label>
                Username
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button onClick={handleLoginClick}>Login</button>
        </div>
    )
};

export default Login;