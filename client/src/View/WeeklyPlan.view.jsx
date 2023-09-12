import React from 'react';
import NavBar from '../Components/NavBar';
import WeeklyForm from '../Components/WeeklyForm';
import FoodCard from '../Components/WeeklyPlan.component';

const RecipesUploadView = () => {
    return (
    
    <div className="container-fluid">
    
        <NavBar/>
    <hr/>
        <WeeklyForm/>
        <FoodCard/>
    </div>
    );
};

export default RecipesUploadView;