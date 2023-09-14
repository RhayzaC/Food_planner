import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Layout from '../Templates/Layout.templates';


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
    <Layout>
    <div>
        <h2 className="m-3 text-black mt-4 mb-4">{recipe.title}</h2>
        <div className="d-flex justify-content-around">
                <div>
                    <table className="table table-striped m-4">
                        <thead className="table-secondary">
                            <tr >
                                <th scope="col">Qty</th>
                                <th scope="col">Measure</th>
                                <th scope="col">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipe.ingredients && recipe.ingredients.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{item.qty}</td>
                                    <td>{item.measure} </td>
                                    <td>{item.ingredient.name}</td>
                                </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <div className="text-center">
                    <img
                        src={recipe.photo}
                        alt="Dish photo"
                        className="img-fluid m-3" 
                        style={{ maxWidth: '500px', maxHeight: '500px' }}
                    />
                </div>
        </div>
        <hr/>
        <h5 className="text-left">Instructions: </h5>
        <div>{recipe.instructions}</div>
    </div>
    </Layout>
    );
};

export default RecipeDetailView;