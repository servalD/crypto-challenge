import React from 'react';
import './App.css';
import {ServiceErrorCode} from "../../services/service.result";
import {NavLink} from "react-router-dom";

function Info() {
    return (
        <div>
            <h1>Me</h1>
            <NavLink to="../subscribe">Subscribe</NavLink>
        </div>
    )
}

export default Info;
