import React from 'react';
import { Outlet } from 'react-router-dom';
import Login from '../pages/Login';

function PrivateRoutes({children}) {
    return ( 
        localStorage.token !== "null" ? <Outlet /> : <Login />
    );
}

export default PrivateRoutes;