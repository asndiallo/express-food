import React, { useState } from 'react';
import './Login.css';
import axios from "axios";
import {domain} from '../variables.js'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [messageLogin, setMessageLogin] = useState('');
    const [messagePassword, setMessagePassword] = useState('');

    const connection = async () => {
        const link = domain + "/api/v1/customers/login/";
        if (link !== '') {
            await axios.post(link, {
                email: login,
                password: password
            })
            .then(function(res) {
               var data = res.data;
               if (data !== null) {
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('idUser', data.customer_id)
                    navigate('/');
               }
            })
            .catch(function(error) {
                setMessageLogin("L'identifiant ou le mot de passe est incorrect !");
                setMessagePassword("L'identifiant ou le mot de passe est incorrect !");
                console.log(error);
            });
        } 
    }

    const handleSubmit = (event) => {
        let validate = true;
        event.preventDefault();

        if (!(login.length >= 3 && login.length <= 100)) {
            setMessageLogin("Veuillez renseigner un nom d'utilisateur entre 3 et 20 caractères !")
            validate = false;
        }
        if (!(password.length >= 3 && password.length <= 20)) {
            setMessagePassword("Veuillez renseigner un mot de passe entre 3 et 20 caractères !")
            validate = false;
        }

        if (validate) {
            connection();
        }

        return validate;
    }

    return ( 
        <div 
            className="login_page"
            style={{backgroundImage: "url(/images/chad.jpg)", backgroundSize: "cover", backgroundRepeat: 'no-repeat'}}
        >
            <div className="login_content">
                <form action="" className="log-formulaire" onSubmit={(e)=>handleSubmit(e)}>
                    <h1>Connexion</h1>
                    <div className="container-col">
                        <label htmlFor="login">Nom d'utilisateur</label>
                        <input type="text" value={login} onChange={(e)=>setLogin(e.target.value)} maxLength="100" required />
                        <span className="log-message">{messageLogin}</span>
                    </div>
                    <div className="container-col">
                        <label htmlFor="login">Mot de passe</label>
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} maxLength="20" required />
                        <span className="log-message">{messagePassword}</span>
                    </div>
                    <input type="submit" className="form_button" value="Connexion" />
                </form>
            </div>
           
        </div>
    );
}

export default Login;