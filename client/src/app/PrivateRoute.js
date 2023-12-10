import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {getTokenFromCookie} from "../cookies/cookies";


const PrivateRoute = () => {
    const auth = !!getTokenFromCookie("TOKEN");
    return auth ? <Outlet/> : <Navigate to="/login"/>;
}

export  default  PrivateRoute;
