import React from 'react';
import './Menu.css';

import { 
    BsCartPlus,
    BsCartPlusFill
} from "react-icons/bs";

function Menu({data}) {

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

    return ( 
        <div className="menu_component">
            <div className="menu_image">
                <span className="menu_price">{data.price}€</span>
            </div>
            <div className="menu_description">
                <span className="menu_title">{data.name}</span>
                <span className="menu__span_description">{data.description}</span>
                <span className="menu_type">{getCorrectTypeMenu(data.type)}</span>
                <div className="menu_order">
                    <BsCartPlusFill size="18" style={{cursor: 'pointer'}} />
                    <span>0</span>
                </div>
            </div>
        </div>
     );
}

export default Menu;