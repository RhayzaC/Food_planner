import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Layout from "../Templates/Layout.templates";
import FoodCard from "../Components/FoodCard.component";

const RecipesUploadView = () => {
    const [selectedMealType, setSelectedMealType] = useState("");
    const [weeklyRecipes, setWeeklyRecipes] = useState([
        { day: "Monday", recipes: [] },
        { day: "Tuesday", recipes: [] },
        { day: "Wednesday", recipes: [] },
        { day: "Thursday", recipes: [] },
        { day: "Friday", recipes: [] },
        { day: "Saturday", recipes: [] },
        { day: "Sunday", recipes: [] },
    ]);

    // Define a function to update the weeklyRecipes state
    const updateWeeklyRecipes = (dayName, recipes) => {
        const updatedWeeklyRecipes = [...weeklyRecipes];
        const dayIndex = updatedWeeklyRecipes.findIndex((dayRecipe) => dayRecipe.day === dayName);
    
        if (dayIndex !== -1) {
            updatedWeeklyRecipes[dayIndex].recipes = Object.values(recipes);
            setWeeklyRecipes(updatedWeeklyRecipes);
    
            // Log the updated weeklyRecipes
            console.log("Updated weeklyRecipes:", updatedWeeklyRecipes);
        }
    };
    
    const handleMealTypeChange = (event) => {
        setSelectedMealType(event.target.value);
    };

    const navigate = useNavigate(); // Initialize useNavigate

    // Function to navigate to the shoplist route
    const goToShopList = () => {
        navigate("/recipe/shoplist", {state: { weeklyRecipes }}); // Pass weeklyRecipes as a prop to the route
    };

    return (
        <Layout>
            <div className="container mt-5 mb-5 d-flex flex-column align-items-center">
                <h1 className="text-dark text-decoration-underline mt-3">Meal Planner</h1>
                <div className="m-3 text-dark">
                    <label>
                        Select Meal Type:
                        <select
                            className="m-2 btn btn-warning text-black"
                            value={selectedMealType}
                            onChange={handleMealTypeChange}
                        >
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Healthy">Healthy</option>
                            <option value="Regular">Regular</option>
                        </select>
                    </label>
                </div>
                <div className="d-flex text-black" style={{ backgroundColor: 'lightpink', width: '1325px' }}>
                    <hr />
                    {weeklyRecipes.map((dayRecipe) => (
                        <FoodCard
                            key={dayRecipe.day}
                            dayName={dayRecipe.day}
                            mealType={selectedMealType}
                            onUpdateRecipes={updateWeeklyRecipes} // Pass the update function
                        />
                    ))}
                </div>
                <div className="d-flex text-center">
                    <Link
                        type="submit"
                        className="mt-4 px-4 btn btn-m btn-info outline mx-2"
                        to={"/recipe/new/"}
                    >
                        Create Your Recipe
                    </Link>
                    <Link
                        type="submit"
                        className="mt-4 px-4 btn btn-m btn-info outline mx-2"
                        to={"/recipe/all/"}
                    >
                        All recipes                    
                    </Link>

                    {/* Use onClick to call the goToShopList function */}
                    <div className="d-flex text-center">
                        <button
                            type="button"
                            onClick={goToShopList}
                            className="mt-4 px-4 btn btn-m btn-primary mx-2"
                        >
                            See shopping list
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default RecipesUploadView;
