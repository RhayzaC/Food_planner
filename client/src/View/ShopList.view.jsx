import React from "react";
import Layout from "../Templates/Layout.templates";
import { useLocation } from "react-router-dom";

const ShopList = (props) => {
    // Access the weeklyRecipes prop from props
    const location = useLocation();

    // Now you can access the weeklyRecipes
    const weeklyRecipes = location.state?.weeklyRecipes || [];
    //agregando console.log de prueba
    console.log("weeklyRecipes:", weeklyRecipes); 
    console.log(props); 

    // Function to calculate the shopping list
    const calculateShoppingList = () => {
        // Initialize an empty shopping list
        const shoppingList = [];
    
        // Iterate through the days and their recipes
        weeklyRecipes.forEach((dayRecipe) => {
            if (dayRecipe.recipes) {
                dayRecipe.recipes.forEach((recipe) => {
                    if (recipe && recipe.ingredients) {
                        console.log("Recipe:", recipe); // Verifica la estructura de la receta
                        // Add each ingredient to the shopping list
                        recipe.ingredients.forEach((ingredient) => {
                            shoppingList.push(
                                `${ingredient.ingredient}, ${ingredient.qty} ${ingredient.measure}`
                            );
                            console.log("Ingredient:", ingredient); // Verifica cada ingrediente
                        });
                    }
                });
            }
        });
    
        return shoppingList;
    };    

    // Get the shopping list
    const shoppingList = calculateShoppingList();

    return (
        <Layout>
            <div>
                <h1>Shopping List</h1>
                <ul>
                    {shoppingList.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};

export default ShopList;
