import React, { useState } from 'react';
import "./OrderItem.css";
import { BsFillCaretRightFill } from "react-icons/bs";

function OrderItem() {
    const [active, setActive] = useState(false);
    const data = {meals: [], delivered: false, deliverer: {name: "test"}}

    const getCorrectType = (type) => {
        switch (type) {
            case "dessert":
                return "Dessert";
            case "dish":
                return "Plat";
            default:
                return "Inconnu";
        }
    }

    const getTimeDeliver = () => {
        return "12m12s";
    }

    const getTotalPrice = () => {
        let price = 0;
        data.meals.forEach((item) => {
            price += item.price;
        })
        return price;
    }

    return ( 
        <div className="order_item">
            <div className="order_item_row">
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span className="orders_title">Commande n°1</span>
                    <span className="orders_title">Livreur : {data.deliverer.name}</span>
                    <span className="orders_title">Temps restants : {getTimeDeliver()}</span>
                    <span className="orders_title">Prix total : {getTotalPrice()} €</span>
                </div>
                
                <div onClick={()=>setActive(!active)}>
                    <BsFillCaretRightFill 
                        className={"orders_arrow " + (active ? "active" : "")} 
                        size="28" 
                    />
                </div>
            </div>
            {
                active &&
                <div className="order_informations">
                    <table className="order_table">
                        <thead>
                            <tr>
                                <td style={{width: "10%"}}>Type</td>
                                <td style={{width: "25%"}}>Nom</td>
                                <td style={{width: "60%"}}>Description</td>
                                <td style={{width: "5%"}}>Prix</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.meals.map((item) => {
                                    return (
                                        <tr>
                                            <td>{getCorrectType(item.type)}</td>
                                            <td>{item.name}</td>
                                            <td className="order_desc">{item.description}</td>
                                            <td>{item.price} €</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}

export default OrderItem;