import React, { useState} from 'react';
import { domain } from '../variables';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

function checkIfNumber(input) {
    return !isNaN(input);
}

function Signup() {
    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [name, setName] = useState('');
    const [adresse, setAdresse] = useState('');
    const [zip, setZIP] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [country, setCountry] = useState('');

    const [messageLogin, setMessageLogin] = useState('');
    const [messagePassword, setMessagePassword] = useState('');
    const [messageConfirmPassword, setMessageConfirmPassword] = useState('');
    const [messageFirstName, setMessageFirstName] = useState('');
    const [messageName, setMessageName] = useState('');
    const [messageAdresse, setMessageAdresse] = useState('');
    const [messageZip, setMessageZip] = useState('');
    const [messagePhone, setMessagePhone] = useState('');
    const [messageBirthday, setMessageBirthday] = useState('');
    const [messageCountry, setMessageCountry] = useState('');
    
    const clearMessages = () => {
        setMessageLogin('');
        setMessagePassword('');
        setMessageConfirmPassword('');
        setMessageFirstName('');
        setMessageName('');
        setMessageAdresse('');
        setMessageZip('');
        setMessageBirthday('');
        setMessageLogin('');
        setMessagePhone('');
        setMessageCountry('');
    }

    const handleSubmit = (event) => {
        let validate = true;
        event.preventDefault();

        // On clear les messages d'alertes
        clearMessages();

        if (!(login.length >= 3 && login.length <= 100)) {
            setMessageLogin("Veuillez renseigner un nom d'utilisateur entre 3 et 20 caractères !")
            validate = false;
        }
        if (!(password.length >= 3 && password.length <= 20)) {
            setMessagePassword("Veuillez renseigner un mot de passe entre 3 et 20 caractères !")
            validate = false;
        }
        if (!(confirmPassword.length >= 3 && confirmPassword.length <= 20)) {
            setMessageConfirmPassword("Veuillez renseigner un mot de passe entre 3 et 20 caractères !")
            validate = false;
        }
        if (confirmPassword !== password) {
            setMessagePassword("Vos mots de passes sont différents !")
            setMessageConfirmPassword("Vos mots de passes sont différents !")
            validate = false;
        }
        if (!(firstName.length >= 3 && firstName.length <= 20)) {
            setMessageFirstName("Veuillez renseigner un prénom entre 3 et 20 caractères !")
            validate = false;
        }
        if (!(name.length >= 3 && name.length <= 20)) {
            setMessageName("Veuillez renseigner un nom entre 3 et 20 caractères !")
            validate = false;
        }
        if (!(adresse.length >= 3 && adresse.length <= 64)) {
            setMessageAdresse("Veuillez renseigner une adresse entre 3 et 64 caractères !")
            validate = false;
        }
        if (zip.length < 5 || !checkIfNumber(zip)) {
            setMessageZip("Veuillez renseigner un code postal valide !")
            validate = false;
        }
        if (!(name.length >= 3 && name.length <= 20)) {
            setMessageName("Veuillez renseigner un nom entre 3 et 20 caractères !")
            validate = false;
        }
        if (parseInt(phone.length) !== 10) {
            setMessagePhone("Veuillez renseigner un numéro de téléphone valide !")
            validate = false;
        }
        if (!(country.length >= 3)) {
            setMessageCountry("Veuillez renseigner un pays valide !")
            validate = false;
        }

        if (validate) {
            inscription();
        }

        return validate;
    }

    const inscription = async () => {
        const link = domain + "/api/v1/customers/signup/";
        if (link !== '') {
            await axios.post(link, {
                email: login,
                password: password,
                first_name: firstName,
                last_name: name,
                birthday: birthday,
                phone: phone,
                address:adresse,
                zip: zip,
                country: country,
            })
            .then(function(res) {
                console.log(res)
                alert('Votre compte a bien été crée ! Rendez-vous sur la page de connexion pour vous connecter !')
                // navigate('/');
            })
            .catch(function(error) {
                alert('Le compte existe déjà !');
                console.log(error);
            });
        } 
    }

    return ( 
        <div 
            className="signup_page"
            style={{backgroundImage: "url(/images/brooke.jpg)", backgroundSize: "cover", backgroundRepeat: 'no-repeat'}}
        >
            <div className="signup_content">
                <form action="" className="log-formulaire" onSubmit={(e)=>handleSubmit(e)}>
                    <h1>Inscription</h1>
                    <div className="container-col">
                        <label htmlFor="login">Adresse e-mail</label>
                        <input type="text" value={login} onChange={(e)=>setLogin(e.target.value)} maxLength="100" required />
                        <span className="log-message">{messageLogin}</span>
                    </div>
                    <div className="container-col">
                        <label htmlFor="login">Mot de passe</label>
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} maxLength="20" required />
                        <span className="log-message">{messagePassword}</span>
                    </div>
                    <div className="container-col">
                        <label htmlFor="login">Confirmation du mot de passe</label>
                        <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} maxLength="20" required />
                        <span className="log-message">{messageConfirmPassword}</span>
                    </div>
                    <div className="container-col">
                        <label htmlFor="login">Prénom</label>
                        <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} maxLength="20" required />
                        <span className="log-message">{messageFirstName}</span>
                    </div>
                    <div className="container-col">
                        <label htmlFor="login">Nom de famille</label>
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} maxLength="20" required />
                        <span className="log-message">{messageName}</span>
                    </div>
                    <div className="container-col">
                        <label htmlFor="login">Adresse</label>
                        <input type="text" value={adresse} onChange={(e)=>setAdresse(e.target.value)} maxLength="20" required />
                        <span className="log-message">{messageAdresse}</span>
                    </div>
                    <div className="container-col">
                        <label htmlFor="login">Code postal</label>
                        <input type="text" value={zip} onChange={(e)=>setZIP(e.target.value)} maxLength="5" required />
                        <span className="log-message">{messageZip}</span>
                    </div>
                    <div className="container-col">
                        <label htmlFor="login">Pays</label>
                        <input type="text" value={country} onChange={(e)=>setCountry(e.target.value)} maxLength="64" required />
                        <span className="log-message">{messageCountry}</span>
                    </div>
                    <div className="container-col">
                        <label htmlFor="login">Téléphone</label>
                        <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} maxLength="10" required />
                        <span className="log-message">{messagePhone}</span>
                    </div>
                    <div className="container-col">
                        <label htmlFor="login">Date de naissance</label>
                        <input type="date" value={birthday} onChange={(e)=>setBirthday(e.target.value)} maxLength="20" required />
                        <span className="log-message">{messageBirthday}</span>
                    </div>
                    <input type="submit" className="form_button" value="Confirmer l'inscription" />
                </form>
            </div>
           
        </div>
    );
}

export default Signup;