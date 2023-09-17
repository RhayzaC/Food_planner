import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/joy/Autocomplete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Delete } from '@mui/icons-material'; // Importa el icono "Delete" de Material Icons

function RecipeForm() {
    const [recipeData, setRecipeData] = useState({
        title: '',
        measure: '',
        qty: '',
        servings: '',
        instructions: '',
        photo: '',
        category: '',
        vegetarian: false,
        healthy: false,
        regular: false,
    });

    const navigate = useNavigate();

    // Ingredients List//
    const [ingredientsList, setIngredientsList] = useState([]);
    const [currentIngredient, setCurrentIngredient] = useState('');
    const [currentQty, setCurrentQty] = useState('');
    const [currentMeasure, setCurrentMeasure] = useState('');
    const [isAccordionOpen, setIsAccordionOpen] = useState(true); // Estado para controlar si el acordeón está abierto

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setRecipeData({ ...recipeData, [name]: checked });
            } else {
            setRecipeData({ ...recipeData, [name]: value });
            }
    };
    
    const handleAddIngredient = () => {
        const newIngredient = {
        ingredient: {...currentIngredient},
        qty: currentQty,
        measure: currentMeasure,
        };
        console.log(newIngredient);
        setIngredientsList([...ingredientsList, newIngredient]);
        // Abre automáticamente el acordeón después de agregar un ingrediente
        setIsAccordionOpen(true);

        setCurrentIngredient('');
        setCurrentQty('');
        setCurrentMeasure('');
        console.log(ingredientsList);
    };

    const handleRemoveIngredient = (indexToRemove) => {
        // Crea una nueva lista de ingredientes sin el elemento en el índice especificado.
        const newIngredientsList = ingredientsList.filter((_, index) => index !== indexToRemove);
        // Actualiza el estado de la lista de ingredientes.
        setIngredientsList(newIngredientsList);
    };
    
//Probando Edicion Código//
    const [allIngredients, setAllIngredients] = useState([]);

    useEffect(() => {
            getAllIngredients();
        }, []);

        const getAllIngredients = async () => {
            try {
                let res = await axios.get("http://localhost:8000/api/ingredients", {
                    withCredentials: true,
                });
                setAllIngredients(res.data);
                } catch (err) {
                console.log(err);
                }
            }; 

    const handleSubmit = (e) => {
        e.preventDefault();
        createRecipe();
    };

    const createRecipe = async () => {
        try {
            let data = {...recipeData, ingredients: ingredientsList.map((elmt) => {return {...elmt, ingredient: elmt.ingredient.id}})}
        let res = await axios.post("http://localhost:8000/api/recipe", data, {
            withCredentials: true,
        });         
            navigate("/recipe/");
        } catch (err) {
        console.log(err);
        }
    };

    return (
        <Container>
            <div style={{ display:'flex', margin: "20px", marginTop:"50px", borderRadius: "10px", backgroundColor: "#95b8f6", padding: "30px" }}>
            <div style={{ marginRight: '50px' }}>
                <h2 className='text-dark text-decoration-underline mb-4'> Create a Recipe</h2>
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
                                console.log(newValue);
                                setCurrentIngredient(newValue);
                            }}
                            options={allIngredients.map((ingredient) => {return {id: ingredient._id, label: ingredient.name}})}
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
                        options={['cup','cups','gram','grams','spoon','spoons','teaspoon', 'teaspoons']}
                        renderInput={(params) => <TextField {...params} variant='outlined' />}
                        />
                </div>
                    <Button
                    className='mb-3'
                    variant='contained'
                    color='primary'
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
            <br/>
            {/* Checkboxes para opciones */}
            <div className="text-center d-flex justify-content-around">
                            <label className='d-inline-flex mx-3 text-black text-decoration-underline'>
                                Options:
                            </label>
                            <div style={{ flex: 2 }}>
                                <label className=' d-flex text-dark mx-2'>
                                    <input
                                        type="checkbox"
                                        name="healthy"
                                        checked={recipeData.healthy}
                                        onChange={handleChange}
                                    />
                                    Healthy
                                </label>
                            </div>
                            <div style={{ flex: 2 }}>
                            <label className='d-flex text-dark mx-2'>
                                    <input
                                        type="checkbox"
                                        name="regular"
                                        checked={recipeData.regular}
                                        onChange={handleChange}
                                    />
                                    Regular
                                </label>
                            </div>
                            <div style={{ flex: 2 }}>
                            <label className='d-flex text-dark mx-2'>
                                    <input
                                        type="checkbox"
                                        name="vegetarian"
                                        checked={recipeData.vegetarian}
                                        onChange={handleChange}
                                    />
                                    Vegetarian
                                </label>
                            </div>
                        </div>
                        <br/>
            <button className="mt-3 px-4 btn btn-ml btn-secondary mx-auto" type="submit">
                Save
            </button>
            </form>
            </div>
    {/* Columna de la lista de ingredientes */}
    <div style={{ flex: 1, marginTop: '180px', marginBottom: 'auto', marginLeft:'20px' }}>
        <Accordion expanded={isAccordionOpen} onChange={() => setIsAccordionOpen(!isAccordionOpen)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='ingredient-list-content' id='ingredient-list-header'>
                <Typography className='text-info font-italic'>Selected Ingredients:</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ul className='list-unstyled'>
                {ingredientsList.map((ingredient, index) => (
                    <li key={index} className='text-dark'>
                    {ingredient.qty} {ingredient.measure} {ingredient.ingredient.label}
                    <span
                        onClick={() => handleRemoveIngredient(index)}
                        style={{ cursor: 'pointer', marginLeft: '4px', color: 'red' }}
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
