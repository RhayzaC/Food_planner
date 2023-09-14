import React from 'react';
import RecipeForm from '../Components/NewRecipe.component';
import Layout from '../Templates/Layout.templates';

const RecipesUploadView = () => {
    return (
        <Layout>
    <div>
        <hr/>
        <RecipeForm />
    </div>
    </Layout>
    );
};
export default RecipesUploadView;
