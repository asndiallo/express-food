import React, { useState, useEffect } from 'react';
import './DescriptionMenu.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { domain } from '../variables';

function DescriptionMenu({type}) {
    const { menuId } = useParams();
    const [menu, setMenu] = useState({});

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

    const addToCart = () => {

    }

    return ( 
        <div className="description_menu_page">
            <div 
                className="description_content"
                style={{backgroundImage: "url(/images/bol.jpg)", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}
            >
                <h1>{menu.name}</h1>
                <h4>{getCorrectType()}</h4>
                <h1>Description</h1>
                <h4 className='desc'>{menu.description}</h4>
                <h1>Prix</h1>
                <h4 style={{fontSize: 28, color: 'gold'}}>{menu.price}€</h4>
                <button>Ajouter à mon panier</button>
            </div>
        </div>
    );
}

export default DescriptionMenu;