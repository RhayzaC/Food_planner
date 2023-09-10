import NavBar from '../Components/NavBar';
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const RecipeDetailView = () => {
    const [recipe, setRecipe] = useState({});
    const {id} = useParams();

    const getOneRecipe = () => {
        axios.get(`http://localhost:8000/api/recipe/${id}`, {withCredentials: true})
            .then((response) => {
                setRecipe(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const editRecipe = (prop, value) => {
        axios.put(`http://localhost:8000/api/recipe/${id}`, {[prop]: value}, {withCredentials: true})
            .then((response) => {
                setRecipe({
                    ...recipe,
                    [prop]: value
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(getOneRecipe, [id])

    return (
    <div>
        <NavBar/>
        <h1 className="">{recipe.title}</h1>
        <div className="d-flex justify-content-around">
                <div>INGREDIENTES</div>
                <img src={recipe.photo} alt="Dish photo"></img>
        </div>
        <div>{recipe.instructions}</div>
    </div>
    );
};

export default RecipeDetailView;