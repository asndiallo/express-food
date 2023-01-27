import React, { useState, useEffect } from 'react';
import './DescriptionMenu.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { domain, isConnected } from '../variables';
import { AiOutlineCheck } from "react-icons/ai";

function DescriptionMenu({type}) {
    const { menuId } = useParams();
    const [menu, setMenu] = useState({});
    const [validate, setValidate] = useState(false);
    const [messageAlert, setMessageAlert] = useState("");

    useEffect(() => {
        // On utilise la bonne route API
        // selon le type de menu
        switch (type) {
            case "dish":  
                getDish();
                break;
            case "dessert":
                getDessert();
                break;
            default:
                break;
        }
    }, [])

    const getDish = async () => {
        const link = domain + "/api/v1/menus/dish/" + menuId;
        if (link !== '') {
            await axios.get(link, {})
            .then(function(res) {
                const data = res.data;
                setMenu(data);
                console.log(data);
            })
            .catch(function(error) {
                console.log(error);
            });
        } 
    }

    const getDessert = async () => {
        const link = domain + "/api/v1/menus/dessert/" + menuId;
        if (link !== '') {
            await axios.get(link, {})
            .then(function(res) {
                const data = res.data;
                setMenu(data);
                console.log(data);
            })
            .catch(function(error) {
                console.log(error);
            });
        } 
    }

    const getCorrectType = () => {
        switch (type) {
            case "dish":
                return "Plat";
            default:
                return type.charAt(0).toUpperCase() + type.slice(1);
        }
    }

    const addToCart = async () => {

        if (!isConnected()) {
            setMessageAlert("Veuillez vous connecter pour ajouter un repas à votre panier !")
            return false;
        }

        setMessageAlert("");

        const id = localStorage.getItem("idUser");
        const link = domain + "/api/v1/customers/" + id + "/add-to-cart/";
        if (link !== '') {
            await axios.post(link, {
                customer: id,
                menu: menu._id,
                quantity: 1,
            })
            .then(function(res) {
                // On indique qu'on a ajouter au panier
                setValidate(true);

                // on clear l'indiquation pour finir l'animation de validation
                const timeout = setTimeout(() => {
                    setValidate(false);
                    clearTimeout(timeout);
                }, 1000);
            })
            .catch(function(error) {
                alert("Erreur survenue lors de l'ajout au panier ! Veuillez réessayer !")
                console.log(error);
            });
        } 
    }

    return ( 
        <div className="description_menu_page">
            <div 
                className="description_content"
                style={{backgroundImage: "url(" + menu.image + ")", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}
            >
                <h1>{menu.name}</h1>
                <h4>{getCorrectType()}</h4>
                <h1>Description</h1>
                <h4 className='desc'>{menu.description}</h4>
                <h1>Prix</h1>
                <h4 style={{fontSize: 28, color: 'gold'}}>{menu.price}€</h4>
                <div className="validate_container">
                    <button onClick={()=>addToCart()}>Ajouter à mon panier</button>
                    <AiOutlineCheck className={"validate_icon " + (validate ? 'active' : '')} size="34" />
                </div>
                <span style={{textShadow: '0px 2px 2px black', color: 'red', zIndex: 999}}>{messageAlert}</span>
            </div>
        </div>
    );
}

export default DescriptionMenu;