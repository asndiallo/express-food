import React, { useState, useEffect} from 'react';
import './Login.css';
import axios from "axios";

function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [messageLogin, setMessageLogin] = useState('');
    const [messagePassword, setMessagePassword] = useState('');

    const connection = async () => {
        const link = "http://localhost:8000/api/v1/customers/login";
        if (link !== '') {
            await axios.post(link, {
                email: login,
                password: password
            })
            .then(function(res) {
               var data = res.data;
               console.log(res)
            })
            .catch(function(error) {
                console.log(error);
            });
        } 
    }

    const handleSubmit = (event) => {
        let validate = true;
        event.preventDefault();

        if (!(login.length >= 3 && login.length <= 20)) {
            setMessageLogin("Veuillez renseigner un nom d'utilisateur entre 3 et 20 caractères !")
            validate = false;
        }
        if (!(password.length >= 3 && password.length <= 20)) {
            setMessageLogin("Veuillez renseigner un nom d'utilisateur entre 3 et 20 caractères !")
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
            style={{backgroundImage: "url(/images/chad.jpg)", backgroundSize: "100% 100%", backgroundRepeat: 'no-repeat'}}
        >
            <div className="login_content">
                <form action="" className="log-formulaire" onSubmit={(e)=>handleSubmit(e)}>
                    <h1>Connexion</h1>
                    <div className="container-col">
                        <label htmlFor="login">Nom d'utilisateur</label>
                        <input type="text" value={login} onChange={(e)=>setLogin(e.target.value)} maxLength="20" required />
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