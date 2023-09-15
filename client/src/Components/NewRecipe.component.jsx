import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/joy/Autocomplete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Delete } from '@mui/icons-material'; // Importa el icono "Delete" de Material Icons

function RecipeForm() {
    const [recipeData, setRecipeData] = useState({
        title: '',
        ingredients: '',
        measure: '',
        qty: '',
        servings: '',
        instructions: '',
        photo: '',
        category: '',
    });

    const navigate = useNavigate();

    // Ingredients List//
    const [ingredientsList, setIngredientsList] = useState([]);
    const [currentIngredient, setCurrentIngredient] = useState('');
    const [currentQty, setCurrentQty] = useState('');
    const [currentMeasure, setCurrentMeasure] = useState('');

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
        setCurrentIngredient('');
        setCurrentQty('');
        setCurrentMeasure('');
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
        const response = await axios.post('http://localhost:8000/api/recipe/', recipeData);
        console.log('Receta subida con éxito:', response.data);
        navigate(`/`);
        } catch (error) {
        console.error('Error al subir la receta:', error);
        }
    };


    return (
        <Container>
        <div style={{ display:'flex', margin: "20px", marginTop:"50px", borderRadius: "10px", backgroundColor: "#95b8f6", padding: "30px" }}>
        <div style={{ marginRight: '50px' }}>
            <h2 className='text-dark text-center text-decoration-underline mb-4'> Create a Recipe</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label className='text-black' htmlFor="title"> Tittle:</label>
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
                    <label className='text-black' htmlFor="currentIngredient">Ingredient:</label>
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
                <label className='text-black' htmlFor="currentQty">Qty:</label>
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
                    <label className='text-black' htmlFor="currentMeasure">Measure:</label>
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
                    color='secondary'
                            onClick={handleAddIngredient}
                        >
                        Add Ingredient
                    </Button>
                <div className="mb-3">
                    <label className='text-black' htmlFor="servings">Servings:</label>
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
                <label className='text-black' htmlFor="instructions">Instructions:</label>
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
                <label className='text-black' htmlFor="photo">Photo URL :</label>
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
            <label className='text-black' htmlFor="category">Category:</label>
                <select
                    id="category"
                    name="category"
                    className='form-control'
                    value={recipeData.category}
                    onChange={handleChange}
                    required
                >
                    <option value=""> Select a Category </option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Snacks">Snacks</option>
                </select>
            </div>
            <button className="mt-3 px-4 btn btn-ml btn-success mx-auto" type="submit">
                Save
            </button>
            </form>
            </div>
        <div  className='my-5 m-5' style={{ flex: 1 }}>
        {/* Columna de la lista de ingredientes */}
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='ingredient-list-content' id='ingredient-list-header'>
                <Typography className='text-info'>Selected Ingredients:</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ul className='list-unstyled'>
                {ingredientsList.map((ingredient, index) => (
                    <li key={index} className='text-dark'>
                    {ingredient.qty} {ingredient.measure} {ingredient.ingredient}
                    <span
                        onClick={() => handleRemoveIngredient(index)}
                        style={{ cursor: 'pointer', marginLeft: '5px', color: 'red' }}
                    >
                        <Delete />
                    </span>
                    </li>
                ))}
                </ul>
            </AccordionDetails>
            </Accordion>
                </div>
                </div>
                
            </Container>

    );
}


export default RecipeForm;
