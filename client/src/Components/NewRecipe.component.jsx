import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button } from '@mui/material';
import { useNavigate} from 'react-router-dom';
import Autocomplete from '@mui/joy/Autocomplete';
import { Delete } from '@mui/icons-material'; // Importa el icono "Delete" de Material Icons

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

//Ingredients List//
    const [ingredientsList, setIngredientsList] = useState([]);
    const [currentIngredient, setCurrentIngredient] = useState("");
    const [currentQty, setCurrentQty] = useState("");
    const [currentMeasure, setCurrentMeasure] = useState("");


    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipeData({ ...recipeData, [name]: value });
    };

    const handleAddIngredient = () => {
        const newIngredient = {
            ingredient: currentIngredient,
            qty: currentQty,
            measure: currentMeasure,
            };
            setIngredientsList([...ingredientsList, newIngredient]);
            setCurrentIngredient("");
            setCurrentQty("");
            setCurrentMeasure("");
        };
        const handleRemoveIngredient = (indexToRemove) => {
    // Crea una nueva lista de ingredientes sin el elemento en el índice especificado.
        const newIngredientsList = ingredientsList.filter((_, index) => index !== indexToRemove);
     // Actualiza el estado de la lista de ingredientes.
            setIngredientsList(newIngredientsList);
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
        <div style={{ borderRadius: "5px", backgroundColor: "grey", minHeight: "100vh", padding: "30px" }}>
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
                    <label className='text-light' htmlFor="currentIngredient">Ingredient:</label>
                    <Autocomplete
                        id='currentIngredient'
                        name='currentIngredient'
                        value={currentIngredient}
                        onChange={(event, newValue) => {
                            setCurrentIngredient(newValue);
                        }}
                        options={['Ingredient 1', 'Ingredient 2', 'Ingredient 3']}
                        renderInput={(params) => <TextField {...params} variant='outlined' />}
                        />
                </div>
                <div className="mb-3">
                <label className='text-light' htmlFor="currentQty">Qty:</label>
                    <input
                        type="number"
                        className='form-control'
                        id="currentQty"
                        name="currentQty"
                        value={currentQty}
                        onChange={(e) => setCurrentQty(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className='text-light' htmlFor="currentMeasure">Measure:</label>
                    <Autocomplete
                        id='currentMeasure'
                        name='currentMeasure'
                        value={currentMeasure}
                        onChange={(event, newValue) => {
                            setCurrentMeasure(newValue);
                        }}
                        options={['Measure 1', 'Measure 2', 'Measure 3']}
                        renderInput={(params) => <TextField {...params} variant='outlined' />}
                        />
                </div>
                    <Button
                    variant='contained'
                    color='primary'
                            onClick={handleAddIngredient}
                        >
                        Add Ingredient
                    </Button>
                    {/*Ingredients map*/}
                    <ul className='text-light'>
                        {ingredientsList.map((ingredient, index) => (
                            <li key={index}>
                            {ingredient.qty} {ingredient.measure} {ingredient.ingredient}
                            <span
                                onClick={() => handleRemoveIngredient(index)}
                                style={{ cursor: 'pointer', marginLeft: '5px', color: 'black' }}
                            >
                            <Delete />
                            </span>
                            </li>
                        ))}
                    </ul>
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
            <button className="mt-3 px-4 btn btn-ml btn-success mx-auto" type="submit">
                Save
            </button>
            </form>
            </Container>
        </div>
        
    );
}
export default RecipeForm;
