import React, { useState, useEffect } from 'react';
import axios from "axios";
import Layout from '../Templates/Layout.templates';
import { useParams, useNavigate, Link } from "react-router-dom";

import ShopList from "../Components/ShopList.component";

const ShoppingList = (props) => {

    const {selectedMealPlan} = props;

// --------------------------------------------------
// I) HOOKS AND VARIABLES
// --------------------------------------------------
    const [shoppingList, setShoppingList] = useState([]);

    useEffect(() => {
        // Calculate the shopping list based on the selected meal plan
        const calculatedShoppingList = calculateShoppingList(selectedMealPlan);
        setShoppingList(calculatedShoppingList);
    }, [selectedMealPlan]);

// --------------------------------------------------
// II) HANDLERS AND AUXILIAR FUNCTIONS
// --------------------------------------------------

    // Function to calculate the shopping list
    const calculateShoppingList = (mealPlan) => {
        if (!Array.isArray(mealPlan)) {
            return [];
        }

        const shoppingList = [];

        // Iterate through each recipe in the meal plan
        mealPlan.forEach((recipe) => {
            if (!Array.isArray(recipe.ingredients)) {
                return;
            }
            // Iterate through each ingredient in the recipe
            recipe.ingredients.forEach((ingredient) => {
            // Check if the ingredient is already in the shopping list
            const existingItemIndex = shoppingList.findIndex(
                (item) => item.ingredientName === ingredient.name
            );

            if (existingItemIndex !== -1) {
            // If the ingredient is already in the shopping list, update its quantity
                shoppingList[existingItemIndex].quantity += ingredient.quantity;
            } else {
            // If the ingredient is not in the shopping list, add it
                shoppingList.push({
                ingredientName: ingredient.name,
                quantity: ingredient.qty,
                unit: ingredient.measure,
                });
            }
        });
    });

        return shoppingList;
    };

    return (
        <Layout>
        <div>
            <ShopList></ShopList>
            {/* <h2>Shopping List</h2>
            <ul>
                {shoppingList.map((item, index) => (
                <li key={index}>
                    {item.quantity} {item.unit} of {item.ingredientName}
                </li>
                ))}
            </ul> */}
        </div>
        </Layout>
    );
};

export default ShoppingList;
