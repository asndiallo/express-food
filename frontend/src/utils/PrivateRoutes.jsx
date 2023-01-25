import React from 'react';
import { Outlet } from 'react-router-dom';
import Login from '../pages/Login';
import { isConnected } from '../variables';

function PrivateRoutes({children}) {
    return ( 
        isConnected() ? <Outlet /> : <Login />
    );
}

export default PrivateRoutes;