import React , {useState} from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

import NavBar from '../Components/NavBar';
import FoodCard from '../Components/FoodCard.component';


const RecipesUploadView = () => {
    const [selectedMealType, setSelectedMealType] = useState('Regular');

    const handleMealTypeChange = (event) => {
        setSelectedMealType(event.target.value);
    };

    return (
    <div className="container-fluid">
        <NavBar/>
    <hr/>
    <div>
        <h1>Meal Planner</h1>
        <div>
            <label>
            Select Meal Type:
            <select value={selectedMealType} onChange={handleMealTypeChange}>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Healthy">Healthy</option>
                <option value="Regular">Regular</option>
            </select>
            </label>
        </div>
        <div className="d-flex">
            <FoodCard dayName="Monday" mealType={selectedMealType}/>
            <FoodCard dayName="Tuesday" mealType={selectedMealType}/>
            <FoodCard dayName="Wednesday" mealType={selectedMealType}/>
            <FoodCard dayName="Thursday" mealType={selectedMealType}/>
            <FoodCard dayName="Friday" mealType={selectedMealType}/>
            <FoodCard dayName="Saturday" mealType={selectedMealType}/>
            <FoodCard dayName="Sunday" mealType={selectedMealType}/>
        </div>
        <div className="text-center">
            <Link type="submit"
                className="mt-2 px-4 btn btn-m btn-secondary mx-auto"
                to={"/recipe/shoplist/"}>See shopping list
            </Link>
        </div>
    </div>
    </div>
    );
};

export default RecipesUploadView;