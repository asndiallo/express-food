import React, { useState, useEffect } from 'react';
import './Navbar.css'
import { NavLink, useNavigate } from 'react-router-dom';
import useWindowDimensions from '../hooks/useWindowDimensions';

// On importe les icones de react-icons
import {
    BsList
} from 'react-icons/bs';
import { clearLocalStorage, isConnected } from '../variables';

function Navbar() {
    const navigate = useNavigate();
    const { height, width } = useWindowDimensions();
    const [showNavbar, setShowNavbar] = useState(false); // pour montrer la navbar en responsive

    useEffect(() => {
        // On ne veut pas cette variable à true lorsqu'on est sur la version web
        // alors on vérifie la taille de la fenêtre pour savoir si on la turn à false
        if (showNavbar === true) {
            if (isResponsive()) {
                setShowNavbar(false)
            }
        }
    }, [width])

    const isResponsive = () => {
        return width < 1024;
    }

    const handleNavbar = () => {
        setShowNavbar(!showNavbar);
    }

    const logout = () => {
        clearLocalStorage()
        navigate('/');
        setShowNavbar(false);
    }


    const getHeightNavbarResponsive = () => {
        if (!isConnected()) {
            return 223;
        }
        return 340;
    }

    return ( 
        <div 
            className="navbar_component" 
            style={{height: showNavbar ? getHeightNavbarResponsive() : 75}}
        >
            {/* Le container du logo */}
            <div className="navbar_logo_container">
                <BsList className="navbar_btn_list" size={32} onClick={()=>handleNavbar()}/>
                <NavLink to="/" className="navbar_title" onClick={(e)=>setShowNavbar(false)}>Express Food</NavLink>
            </div>
            {/* La liste de la navbar */}
            <div className="navbar_liste">
                {
                    !isConnected() &&
                    <ul>
                        <NavLink to="/login" className="link" onClick={(e)=>setShowNavbar(false)}>Connexion</NavLink>
                        <NavLink to="/signup" className="link" onClick={(e)=>setShowNavbar(false)}>Inscription</NavLink>
                    </ul>
                    ||
                    <ul>
                        <NavLink to="/profil" className="link" onClick={(e)=>setShowNavbar(false)}>Accès à mon profil</NavLink>
                        <NavLink to="/cart" className="link" onClick={(e)=>setShowNavbar(false)}>Mon panier</NavLink>
                        <NavLink to="/orders" className="link" onClick={(e)=>setShowNavbar(false)}>Mes commandes</NavLink>
                        <span className="link" onClick={(e)=>logout()}>Déconnexion</span>
                    </ul>
                }
            </div>
        </div>
    );
}

export default Navbar;