import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import Layout from "../Templates/Layout.templates";
import FoodCard from "../Components/FoodCard.component";

const RecipesUploadView = () => {
    const [selectedMealType, setSelectedMealType] = useState("Regular");
    const [weeklyRecipes, setWeeklyRecipes] = useState([]);

    const handleMealTypeChange = (event) => {
        setSelectedMealType(event.target.value);
    };

    return (
        <Layout>
        <div className="d-flex flex-column align-items-center">
            <h1 className="text-dark text-decoration-underline">Meal Planner</h1>
            <div className="m-3 text-dark" >
                <label>
                    Select Meal Type:
                    <select className="m-2 bg-info text-black"
                            value={selectedMealType} 
                            onChange={handleMealTypeChange}
                    >
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Healthy">Healthy</option>
                        <option value="Regular">Regular</option>
                    </select>
                </label>
            </div>
<<<<<<< HEAD
            <div className= 'd-flex text-black' style={{ backgroundColor:'lightpink', width:'1325px' }}>
                <FoodCard dayName="Monday" mealType={selectedMealType} />
                <FoodCard dayName="Tuesday" mealType={selectedMealType} />
                <FoodCard dayName="Wednesday" mealType={selectedMealType} />
                <FoodCard dayName="Thursday" mealType={selectedMealType} />
                <FoodCard dayName="Friday" mealType={selectedMealType} />
                <FoodCard dayName="Saturday" mealType={selectedMealType} />
                <FoodCard dayName="Sunday" mealType={selectedMealType} />
=======
            <div className= 'd-flex justify-content-center text-black ' style={{ width: '1250px' }}>
                <FoodCard dayName="Monday" mealType={selectedMealType} recipes={weeklyRecipes["Monday"]}/>
                <FoodCard dayName="Tuesday" mealType={selectedMealType} recipes={weeklyRecipes["Tuesday"]}/>
                <FoodCard dayName="Wednesday" mealType={selectedMealType} recipes={weeklyRecipes["Wednesday"]}/>
                <FoodCard dayName="Thursday" mealType={selectedMealType} recipes={weeklyRecipes["Thursday"]}/>
                <FoodCard dayName="Friday" mealType={selectedMealType} recipes={weeklyRecipes["Friday"]}/>
                <FoodCard dayName="Saturday" mealType={selectedMealType} recipes={weeklyRecipes["Saturday"]}/>
                <FoodCard dayName="Sunday" mealType={selectedMealType} recipes={weeklyRecipes["Sunday"]}/>
>>>>>>> b1d24569b2b11691ff7e8c86ceade416dd44c88b
            </div>
            <div class="d-flex text-center">
                <Link
                type="submit"
                class="mt-4 px-4 btn btn-m btn-info outline mx-2"
                to={"/recipe/new/"}
                >
                Create Your Recipe
                </Link>
            <div class="d-flex text-center">
                <Link
                type="submit"
                class="mt-4 px-4 btn btn-m btn-primary mx-2"
                to={"/recipe/shoplist/"}
                >
                See shopping list
                </Link>
            </div>
            </div>
        </div>
        </Layout>
    );
};

export default RecipesUploadView;
