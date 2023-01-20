import React, { useState, useEffect } from 'react';
import './Navbar.css'
import { NavLink } from 'react-router-dom';
import useWindowDimensions from '../hooks/useWindowDimensions';

// On importe les icones de react-icons
import {
    BsList
} from 'react-icons/bs';

function Navbar() {
    const { height, width } = useWindowDimensions();
    const [showNavbar, setShowNavbar] = useState(false);
    const isAuth = false;

    useEffect(() => {
        // On ne veut pas cette variable à true lorsqu'on est sur la version web
        // alors on vérifie la taille de la fenêtre pour savoir si on la turn à false
        if (showNavbar === true) {
            if (width > 1024) {
                setShowNavbar(false)
            }
        }
    }, [width])

    const handleNavbar = (e) => {
        e.preventDefault();
        setShowNavbar(!showNavbar);
    }

    return ( 
        <div 
            className="navbar_component" 
            style={{height: showNavbar ? 270 : 75}}
        >
            {/* Le container du logo */}
            <div className="navbar_logo_container">
                <BsList className="navbar_btn_list" size={32} onClick={(e)=>handleNavbar(e)}/>
                <NavLink to="/" className="navbar_title">Express Food</NavLink>
            </div>
            {/* La liste de la navbar */}
            <div className="navbar_liste">
                {
                    isAuth &&
                    <ul>
                        <NavLink to="/login" className="link">Connexion</NavLink>
                        <NavLink to="/signup" className="link">Inscription</NavLink>
                    </ul>
                    ||
                    <ul>
                        <NavLink to="/profil" className="link">Accès à mon profil</NavLink>
                        <NavLink to="/panier" className="link">Mon panier</NavLink>
                        <NavLink to="/myOrders" className="link">Mes commandes</NavLink>
                        <NavLink to="/logout" className="link">Déconnexion</NavLink>
                    </ul>
                }
            </div>
        </div>
    );
}

export default Navbar;