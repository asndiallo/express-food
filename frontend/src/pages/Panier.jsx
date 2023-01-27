import React, { useState, useEffect } from 'react';
import './Panier.css';
import axios from "axios";
import { domain } from '../variables';
import Menu from '../components/Menu';

import { 
    AiFillCloseCircle,
    AiFillPlusCircle,
    AiFillMinusCircle
} from "react-icons/ai";


function Panier() {
    const [items, setItems] = useState([]);

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
                parseData(data);
            })
            .catch(function(error) {
                console.log(error);
            });
        } 
    }

    const deleteCart = async (idCart) => {
        const id = localStorage.getItem('idUser').toString();
        const link = domain + "/api/v1/customers/" + id + "/cart/delete/" + idCart;
        if (link !== '') {
            await axios.delete(link, {})
            .then(function(res) {
                const newItems = items.filter(item => item._id !== idCart);
                setItems(newItems);
            })
            .catch(function(error) {
                console.log(error);
            });
        } 
    }

    const updateCart = async (item) => {
        const id = localStorage.getItem('idUser').toString();
        const link = domain + "/api/v1/customers/" + id + "/cart/update/" + item._id;
        if (link !== '') {
            await axios.put(link, {
                _id: item._id,
                customer: id,
                menu: item.menuDetails._id,
                quantity: item.quantity
            })
            .then(function(res) {
            })
            .catch(function(error) {
                console.log(error);
            });
        } 
    }

    const getMenu = async (menuName) => {
        let menu = {};        
        const link = domain + "/api/v1/menus/" + menuName + "/details";
        if (link !== '') {
            await axios.get(link, {})
            .then(function(res) {
                menu = res.data;
            })
            .catch(function(error) {
                console.log(error);
            });
        } 
        return menu;
    }

    const parseData = async (carts) => {
        for (let i = 0; i < carts.length; i++) {
            let menuName = carts[i].menu;
            const menu = await getMenu(menuName);
            carts[i].menuDetails = menu;
        }
        setItems(carts)
    }

    const handleChangeQuantity = (item, change) => {
        // S'il y a 0 en quantité alors
        // on supprime l'élément du panier
        if (item.quantity + change < 1) {
            deleteCart(item._id);
        }
        else { // sinon on update la quantité
            const newItems = [...items];
            const index = newItems.findIndex(i => i._id == item._id);
            if (index !== null) {
                newItems[index].quantity += change;
            }
            updateCart(newItems[index]);
            setItems(newItems);

        }
    }

    const order = () => {
        
    }

    return ( 
        <div className="panier_page">
            <div className="panier_content">
                <h1>Mon panier</h1>
                <div className="panier_items">
                    {
                        items.map((item) => {
                            return (
                                <div key={item._id} className="panier_item">
                                    <Menu 
                                        data={item.menuDetails} quantity={item.quantity} 
                                        canAddToCart={false}
                                    />
                                    <div className="panier_remove" onClick={()=>deleteCart(item._id)}>
                                        <AiFillCloseCircle size='22' color='red' style={{cursor: 'pointer'}} />
                                    </div>
                                    <div className="panier_update">
                                        <AiFillPlusCircle size="22" color="yellowgreen" style={{cursor: 'pointer'}} onClick={()=>handleChangeQuantity(item, 1)} />
                                        <span>{item.quantity}</span>
                                        <AiFillMinusCircle size="22" color="orangered" style={{cursor: 'pointer'}} onClick={()=>handleChangeQuantity(item, -1)} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <button 
                    className="primary-button"
                    style={{margin: "50px 0px"}}
                >
                    Passer commande
                </button>
            </div>
        </div>
    );
}

export default Panier;