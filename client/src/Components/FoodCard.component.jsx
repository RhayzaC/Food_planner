import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Accordion, Card, Button } from 'react-bootstrap';

import 'bootswatch/dist/minty/bootstrap.min.css';

const FoodCardPrueba2 = (props) => {
    // Hooks and Variables
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getAllRecipes();
    }, []);

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
        <div>
            <p>{category}</p>
            {filteredByMealType.map((item, idx) => (
            <div key={idx}>
                <label>{item.title}</label>
            </div>
            ))}
        </div>
        );
    };

    return (
        <Card>
        <Card.Title className="font-weight-bold text-center mb-4" style={{ color: '#000' }}>
            {props.dayName}
        </Card.Title>
        <Card.Body>
            {renderRecipes('Breakfast')}
            {renderRecipes('Lunch')}
            {renderRecipes('Dinner')}
            {renderRecipes('Snacks')}
        </Card.Body>
        </Card>
    );
};

export default FoodCardPrueba2;
