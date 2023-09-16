import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
import axios from "axios"
import { Modal, Button } from 'react-bootstrap';

const ModalRecipe = (props) => {
    const [recipe, setRecipe] = useState({});
    // const {id} = useParams();

    const getOneRecipe = () => {
        axios.get(`http://localhost:8000/api/recipe/${props?.id}`, {withCredentials: true})
            .then((response) => {
                setRecipe(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(recipe)
    }

    useEffect(() => { 
        console.log(props)
        if (props.id) {
            getOneRecipe()
        }},
        [props.id]
    )


    return (
        <div>
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{recipe.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Foto de la receta*/}
                    <div className="text-center">
                        <img
                            src={recipe.photo}
                            alt="Dish photo"
                            className="img-fluid m-3" 
                            style={{ maxWidth: '500px', maxHeight: '500px' }}
                        />
                    </div>

                    {/* Tabla de ingredientes */}
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

                    {/* Instrucciones de preparación de la receta */}
                        <h5 className="text-left">Instructions: </h5>
                        <div>{recipe.instructions}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>    
    )
}

export default ModalRecipe