import React, { useState, useEffect } from 'react';
import './DescriptionMenu.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { domain } from '../variables';
import { AiOutlineCheck } from "react-icons/ai";

function DescriptionMenu({type}) {
    const { menuId } = useParams();
    const [menu, setMenu] = useState({});
    const [validate, setValidate] = useState(false);

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
        // On indique qu'on a ajouter au panier
        setValidate(true);

        // on clear l'indiquation pour finir l'animation de validation
        const timeout = setTimeout(() => {
            setValidate(false);
            clearTimeout(timeout);
        }, 1000);

        // on ajoute au panier
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
                <div className="validate_container">
                    <button onClick={()=>addToCart()}>Ajouter à mon panier</button>
                    <AiOutlineCheck className={"validate_icon " + (validate ? 'active' : '')} size="34" />
                </div>
            </div>
        </div>
    );
}

export default DescriptionMenu;