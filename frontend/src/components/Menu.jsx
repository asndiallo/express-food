import React, { useState } from 'react';
import './Menu.css';
import {useNavigate} from 'react-router-dom';
import axios from "axios";

import { 
    BsCartPlus,
    BsCartPlusFill
} from "react-icons/bs";
import { domain, isConnected } from '../variables';

function Menu({data, canAddToCart = true}) {
    const navigate = useNavigate();
    const [added, setAdded] = useState("black");

    const getCorrectTypeMenu = (type) => {
        switch (type) {
            case "dessert":
                return "Dessert";
            case "dish":
                return "Plat";
            default:
                return "Inconnu";
        }
    }

    const redirection = (type, id) => {
        switch (type) {
            case "dish":
                navigate('/dish/'+id);
                break;
            case "dessert":
                navigate('/dessert/'+id);
                break;
            default:
                break;
        }
    }

    const addToCart = async () => {
        const id = localStorage.getItem("idUser");
        const link = domain + "/api/v1/customers/" + id + "/add-to-cart/";
        if (link !== '') {
            await axios.post(link, {
                customer: id,
                menu: data._id,
                quantity: 1,
            })
            .then(function(res) {
                const timeout = setTimeout(() => {
                    setAdded("black");
                    clearTimeout(timeout);
                }, 300);
                setAdded("yellowgreen");
            })
            .catch(function(error) {
                setAdded('red')
                console.log(error);
            });
        } 
    }

    return ( 
        <div className="menu_component">
            <div 
                className="menu_image"
                style={{cursor: 'pointer', backgroundImage: 'url(' + data.image  + ')'}}
                onClick={()=>redirection(data.type, data._id)}
            >
                <span className="menu_price">{data.price}€</span>
            </div>
            <div className="menu_description">
                <span className="menu_title">{data.name}</span>
                <p className="menu__description">{data.description}</p>
                <span className="menu_type">{getCorrectTypeMenu(data.type)}</span>
                {
                    canAddToCart && isConnected() &&
                    <div className="menu_order" onClick={()=>addToCart()}>
                        <BsCartPlusFill size="18" style={{cursor: 'pointer', color: added, transition: "ease-in-out all 0.1s"}} title="Ajouter au panier" />
                    </div>
                }
            </div>
        </div>
     );
}

export default Menu;