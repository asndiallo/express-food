import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu';
import axios from 'axios';
import { domain } from '../variables';
import './Home.css';

function Home() {
    const [dishes, setDishes] = useState([]);
    const [desserts, setDesserts] = useState([]);

    useEffect(() => {
        // On récupère les menus du jour (plats, desserts)
        getTodayMenu()
    }, [])

    const getTodayMenu = async () => {
        const link = domain + "/api/v1/menus";
        if (link !== '') {
            await axios.get(link, {})
            .then(function(res) {
                const data = res.data;
                if (data.today_dishes !== undefined) {
                    setDishes(data.today_dishes);
                }
                if (data.today_desserts !== undefined) {
                    setDesserts(data.today_desserts);

                }
            })
            .catch(function(error) {
                console.log(error);
            });
        } 
    }

    const dispatchData = () => {

    }

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
                        {
                            dishes.map((item) => {
                                return (
                                    <Menu key={item._id} data={item} />
                                )
                            })
                        }
                    </div>
                </div>
                <div className="dessert">
                    <h1>Desserts du jour :</h1>
                    <div className="dessert_content">
                    {
                            desserts.map((item) => {
                                return (
                                    <Menu key={item._id} data={item} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;