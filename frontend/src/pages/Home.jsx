import React from 'react';
import './Home.css';

function Home() {
    return (  
        <div className="home_page">
            <div 
                className="banniere"
                style={{backgroundImage: 'url(/images/brooke.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}
            >
                <h1>Venez découvrir les plats et desserts d'aujourd'hui !</h1>
                <h2>Deux nouveaux plats et desserts à chaque jour de la semaine ! </h2>
            </div>
            <div className="home_content">
                <div className="dish">
                    <h1>Plats du jour :</h1>
                    <div className="dish_content">

                    </div>
                </div>
                <div className="dessert">
                    <h1>Desserts du jour :</h1>
                    <div className="dessert_content"></div>
                    
                </div>
            </div>
        </div>
    );
}

export default Home;