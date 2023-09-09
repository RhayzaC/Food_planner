import React, { useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import Autocomplete from '@mui/joy/Autocomplete';
//import Input from '@mui/joy/Input';


function RecipeForm() {
    const [recipeData, setRecipeData] = useState({
        title: '',
        ingredients: '',
        measure:'',
        qty:'',
        servings:'',
        instructions: '',
        photo: '',
        category: '',
    });

    const navigate = useNavigate(); 
        

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipeData({ ...recipeData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        // Envía los datos al servidor para subir la receta
        const response = await axios.post('http://localhost:8000/api/recipe/', recipeData);
            console.log('Receta subida con éxito:', response.data);
                navigate(`/`);
        } catch (error) {
        console.error('Error al subir la receta:', error);
        }
    };
    return (
        <div style={{ backgroundColor: "black", minHeight: "100vh", padding: "20px" }}>
        <Container>
            <h2 className='text-success text-decoration-underline mb-4'>Upload a Recipe</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label className='text-light' htmlFor="title">Recipe Tittle:</label>
                <input
                    type="text"
                    className='form-control'
                    id="title"
                    name="title"
                    value={recipeData.title}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="mb-3">
                    <label className='text-light' htmlFor="ingredients">Ingredient:</label>
                        <Autocomplete options={['Option 1', 'Option 2', 'Option 3']} />
                </div>
                <div className="mb-3">
                <label className='text-light' htmlFor="qty">Qty:</label>
                    <input
                        type="number"
                        className='form-control'
                        id="qty"
                        name="qty"
                        value={recipeData.qty}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className='text-light' htmlFor="measure">Measure:</label>
                        <Autocomplete options={['Option 1', 'Option 2', 'Option 3']} />
                </div>
                <div className="mb-3">
                    <label className='text-light' htmlFor="servings">Servings:</label>
                        <input
                            type="number"
                            className='form-control'
                            id="servings"
                            name="servings"
                            value={recipeData.servings}
                            onChange={handleChange}
                            required
                        />
                </div>
                <div className="mb-3">
                <label className='text-light' htmlFor="instructions">Instructions:</label>
                    <textarea
                        className='form-control'
                        id="instructions"
                        name="instructions"
                        value={recipeData.instructions}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                <label className='text-light' htmlFor="photo">Photo URL :</label>
                    <input
                        type="text"
                        className='form-control'
                        id="photo"
                        name="photo"
                        value={recipeData.photo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
            <label className='text-light' htmlFor="category">Category:</label>
                <select
                    id="category"
                    name="category"
                    className='form-control'
                    value={recipeData.category}
                    onChange={handleChange}
                    required
                >
                    <option value=""> Select a Category </option>
                        <option value="Appetizers">Breakfast</option>
                        <option value="Main Course">Lunch</option>
                        <option value="Chicken">Dinner</option>
                        <option value="Chicken">Snacks</option>
                </select>
            </div>
            <button className="btn btn-info mt-3" type="submit">Save</button>
            </form>
            </Container>
        </div>
        
    );
}

export default RecipeForm;
