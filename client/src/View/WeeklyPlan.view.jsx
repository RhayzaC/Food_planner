import React from 'react';
import NavBar from '../Components/NavBar';
import WeeklyForm from '../Components/WeeklyForm.component';
import FoodCard from '../Components/FoodCard.component';
import FoodCardPrueba from '../Components/pruebaFoodCard.component';

const RecipesUploadView = () => {
    return (
    
    <div className="container-fluid">
    
        <NavBar/>
    <hr/>
        <WeeklyForm/>
        {/* <div className="d-flex">
            <FoodCard dayName="Monday"/>
            <FoodCard dayName="Tuesday"/>
            <FoodCard dayName="Wednesday"/>
            <FoodCard dayName="Thursday"/>
            <FoodCard dayName="Friday"/>
            <FoodCard dayName="Saturday"/>
            <FoodCard dayName="Sunday"/>
        </div> */}
        <div className="d-flex">
            <FoodCardPrueba dayName="Monday"/>
            <FoodCardPrueba dayName="Tuesday"/>
            <FoodCardPrueba dayName="Wednesday"/>
            <FoodCardPrueba dayName="Thursday"/>
            <FoodCardPrueba dayName="Friday"/>
            <FoodCardPrueba dayName="Saturday"/>
            <FoodCardPrueba dayName="Sunday"/>
        </div>

    </div>
    );
};

export default RecipesUploadView;