import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Accordion, Card, Button } from 'react-bootstrap';

import ModalRecipe from "../Components/ModalRecipe.component";

import 'bootswatch/dist/minty/bootstrap.min.css';

const FoodCardPrueba2 = (props) => {
    // Hooks and Variables
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getAllRecipes();
    }, []);

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // API Functions
    const getAllRecipes = async () => {
        try {
        let res = await axios.get('http://localhost:8000/api/recipe/');
        setRecipes(res.data);
        } catch (err) {
        console.log(err);
        }
    };

    // JSX
    const renderRecipes = (category) => {
        const filteredRecipes = recipes.filter((item) => {
        return item.category === category;
        });

        const filteredByMealType = filteredRecipes.filter((item) => {
        // Add additional conditions here for other meal types as needed
        if (props.mealType === 'Vegetarian') {
            return item.vegetarian;
        } else if (props.mealType === 'Healthy') {
            return item.healthy;
        } else if (props.mealType === 'Regular') {
            return item.regular;
        }
        return true; // By default, show all recipes
        });

        return (
        <div >
            <p><em>{category}:</em></p>
            {filteredByMealType.map((item, idx) => (
            <div key={idx}>
                <button type="button" className="btn btn-primary" onClick={handleShowModal}>
                    {item.title}
                </button>
            </div>
            ))}
            <ModalRecipe show={showModal} onHide={handleCloseModal}></ModalRecipe>
        </div>
        );
    };

    return (
        <Card className='' style={{ font:'bold', width: '300px' }}>
        <Card.Title className="font-weight-bold text-center m-0 p-0 " style={{ color: '#000' }}>
            <em>{props.dayName}</em>
        </Card.Title>
        <Card.Body className='text-center '>
            {renderRecipes('Breakfast')}
            <hr/>
            {renderRecipes('Lunch')}
            <hr/>
            {renderRecipes('Dinner')}
            <hr/>
            {renderRecipes('Snacks')}
        </Card.Body>
        </Card>
    );
};

export default FoodCardPrueba2;
