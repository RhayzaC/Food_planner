import React from "react";
import { useLocation } from "react-router-dom";

const ShopList = (props) => {
    // Access the weeklyRecipes prop from props
    //esta es la línea de Location que teníamos "const { location } = props;"
    const location  = useLocation(); // Cambié esta linea solo para que funcionara el console.log
    const { state } = location || {}; // Safely access the state object

    // Now you can access the weeklyRecipes
    const weeklyRecipes = state ? state.weeklyRecipes : [];
    console.log("weeklyRecipes:", weeklyRecipes);


    // Function to calculate the shopping list
    const calculateShoppingList = () => {
        // Initialize an empty shopping list
        const shoppingList = [];

        // Iterate through the days and their recipes
        weeklyRecipes.forEach((dayRecipe) => {
            dayRecipe.recipes.forEach((recipe) => {
                console.log("Recipe:", recipe); // Verifica la estructura de la receta
                // Add each ingredient to the shopping list
                recipe.ingredients.forEach((ingredient) => {
                    shoppingList.push(ingredient);
                    console.log("Ingredient:", ingredient); // Verifica cada ingrediente

                });
            });
        });

        return shoppingList;
    };

    // Get the shopping list
    const shoppingList = calculateShoppingList();


    return (
        <div>
            <h1>Shopping List</h1>
            <ul>
                {shoppingList.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
        </div>
    );
};

export default ShopList;

