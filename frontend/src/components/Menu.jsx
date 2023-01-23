import React from 'react';
import './Menu.css';

import { 
    BsCartPlus,
    BsCartPlusFill
} from "react-icons/bs";

function Menu({data}) {
    const obj = {
        id: 1, 
        name: 'Oeuf',
        description: 'zhiouzehgioureg',
        price: 0.15,
        type: 'Plats',
    }

    return ( 
        <div className="menu_component">
            <div className="menu_image">
                <span className="menu_price">{obj.price}€</span>
            </div>
            <div className="menu_description">
                <span className="menu_title">{obj.name}</span>
                <span className="menu_description">{obj.description}</span>
                <span className="menu_type">{obj.type}</span>
                <div className="menu_order">
                    <BsCartPlusFill size="18" style={{cursor: 'pointer'}} />
                    <span>0</span>
                </div>
            </div>
        </div>
     );
}

export default Menu;