import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navigation.css";


const navData = [
    {name: "panel", path: "/panel", exact: true},
    {name: "products", path: "/products"},
    {name: "diarys", path: "/diarys"},
]

const Navigation = (props) => {

    const logoutUser = () => {
        props.rmvToken(['mr-token']);
    };

    const navLinks = navData.map(item => (
        <li key={item.name}>
            <NavLink to={item.path} exact={item.exact ? item.exact : false}>{item.name}</NavLink>
        </li>
    ));

    return (
        <ul>
           {navLinks}
           <li style={{color: "white"}} onClick={logoutUser}>
               <a>Logout</a>
           </li>
        </ul>
    )
};

export default Navigation;