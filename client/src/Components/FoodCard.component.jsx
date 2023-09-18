import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

import ModalRecipe from '../Components/ModalRecipe.component';

import 'bootswatch/dist/minty/bootstrap.min.css';

const FoodCardPrueba2 = (props) => {
    // Hooks and Variables
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState();
    const [mealTypeRecipes, setMealTypeRecipes] = useState({});

    useEffect(() => {
        getAllRecipes();
    }, []);

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = (recipe) => {
        setSelectedRecipe(recipe);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const getRandomRecipesForDay = (filteredRecipes) => {
        const randomRecipes = {};
        const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
        categories.forEach((category) => {
            const categoryRecipes = filteredRecipes.filter((item) => item.category === category);
            const randomIndex = Math.floor(Math.random() * categoryRecipes.length);
            randomRecipes[category] = categoryRecipes[randomIndex];
        });
        return randomRecipes;
    };

    const filterRecipesByMealType = (mealType) => {
        const filteredByType = recipes.filter((item) => {
            if (mealType === 'Vegetarian') {
                return item.vegetarian;
            } else if (mealType === 'Healthy') {
                return item.healthy;
            } else if (mealType === 'Regular') {
                return item.regular;
            }
            return true; // By default, show all recipes
        });

        return getRandomRecipesForDay(filteredByType);
    };

    useEffect(() => {
        const filteredRecipes = filterRecipesByMealType(props.mealType);
        setMealTypeRecipes(filteredRecipes);
    }, [props.mealType]);

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
        const randomRecipe = mealTypeRecipes[category];

        console.log(`Recipes for ${category}:`, randomRecipe);
        
        return (
            <div>
                <p><em>{category}:</em></p>
                {randomRecipe && (
                    <div key={randomRecipe._id}>
                        <button type="button" className="btn btn-primary" onClick={() => handleShowModal(randomRecipe)}>
                            {randomRecipe.title}
                        </button>
                    </div>
                )}
            </div>
        );
    };

    useEffect(() => {
        if (Object.keys(mealTypeRecipes).length > 0) {
            // After recipes are generated, update the weeklyRecipes
            props.onUpdateRecipes(props.dayName, mealTypeRecipes);
        }
    }, [mealTypeRecipes]);

    return (
        <>
            <ModalRecipe show={showModal} onHide={handleCloseModal} id={selectedRecipe?._id}></ModalRecipe>
            <Card className='' style={{ font: 'bold', width: '300px' }}>
                <Card.Title className="font-weight-bold text-center m-0 p-0 " style={{ color: '#000' }}>
                    <em>{props.dayName}</em>
                </Card.Title>
                <Card.Body className='text-center '>
                    {renderRecipes('Breakfast')}
                    <hr />
                    {renderRecipes('Lunch')}
                    <hr />
                    {renderRecipes('Dinner')}
                    <hr />
                    {renderRecipes('Snacks')}
                </Card.Body>
            </Card>
        </>
    );
};

export default FoodCardPrueba2;
