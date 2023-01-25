import React, { useState, useEffect } from 'react';
import './Panier.css';
import axios from "axios";
import { domain } from '../variables';
import Menu from '../components/Menu';

import { AiFillCloseCircle } from "react-icons/ai";


function Panier() {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        // on récupère le panier
        getCart();
    }, [])

    const getCart = async () => {
        const id = localStorage.getItem('idUser').toString();
        const link = domain + "/api/v1/customers/" + id + "/cart";
        if (link !== '') {
            await axios.get(link, {})
            .then(function(res) {
                const data = res.data;
                console.log(res)
            })
            .catch(function(error) {
                console.log(error);
            });
        } 
    }

    return ( 
        <div className="panier_page">
            <div className="panier_content">
                <h1>Mon panier</h1>
                <div className="panier_items">
                    {
                        menus.map((item) => {
                            return (
                                <div key={item._id} className="panier_item">
                                    <Menu data={item} />
                                    <div className="panier_remove">
                                        <AiFillCloseCircle size='22' color='red' style={{cursor: 'pointer'}} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Panier;