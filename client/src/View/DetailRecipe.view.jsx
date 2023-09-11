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
        console.log(recipe)
    }

    // const editRecipe = (prop, value) => {
    //     axios.put(`http://localhost:8000/api/recipe/${id}`, {[prop]: value}, {withCredentials: true})
    //         .then((response) => {
    //             setRecipe({
    //                 ...recipe,
    //                 [prop]: value
    //             })
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }

    useEffect(getOneRecipe, [id])

    return (
    <div>
        <NavBar/>
        <h2 className="m-3">{recipe.title}</h2>
        <div className="d-flex justify-content-around">
                <div>
                    <table className="table table-striped">
                        <thead className="table-secondary">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Measure</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipe.map &&
                                recipe.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{item.ingredients?.name}</td>
                                    <td>{item.ingredients?.qty}</td>
                                    <td>{item.ingredients?.measure} </td>
                                </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <img src={recipe.photo} alt="Dish photo"></img>
        </div>
        <div>{recipe.instructions}</div>
    </div>
    );
};

export default RecipeDetailView;