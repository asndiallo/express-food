import React, { useState, useEffect } from 'react';
import "./Orders.css";
import axios from "axios";

import OrderItem from '../components/OrderItem';
import { domain, isConnected } from '../variables';

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // on récupère les commandes
        if (isConnected()) {
            getOrders()
        }
        else {
            alert("Une erreur est survenue ! Vous n'êtes pas connecté !");
        }
    }, [])

    const getOrders = async () => {
        const link = domain + "/api/v1/orders";
        if (link !== '') {
            await axios.get(link, {})
            .then(function(res) {
                const data = res.data;
                setOrders(data);
            })
            .catch(function(error) {
                console.log(error);
            });
        } 
    }
    
    return ( 
        <div className="orders_page">
            <div className="orders_content">
                <h1>Mes commandes</h1>
                <div className="orders_items">
                    {
                        orders.map((item) => {
                            return (
                                <OrderItem key={item._id} data={item} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Orders;