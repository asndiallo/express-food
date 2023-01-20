import React from 'react';
import './Footer.css';

function Footer() {
    return ( 
        <div className="footer_component">
            <div className="footer_infos">
                <div className="footer_contact">
                    <h1>Coordonnées</h1>
                    <span>Express Food</span>
                    <span>25 Rue Claude Tillier</span>
                    <span>75012 Paris</span>
                    <span>01 55 43 26 65</span>
                </div>
                <div className="footer_cond">
                    <h1>Informations supplémentaires</h1>
                    <a href="">Conditions d'utilisations</a>
                </div>
            </div>
            <div className="footer_copyright">
                <span>Copyright Express Food 2023</span>
                <span>|</span>
                <span>Mentions légales</span>
                <span>|</span>
                <span>Contacts</span>
            </div>
        </div>
    );
}

export default Footer;