import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
import axios from "axios"
import { Modal, Button } from 'react-bootstrap';
import {baseUrl} from '../config.js';

const ModalRecipe = (props) => {
    const [recipe, setRecipe] = useState({});
    // const {id} = useParams();

    const getOneRecipe = () => {
        axios.get(`${baseUrl}/api/recipe/${props?.id}`, {withCredentials: true})
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
            <Modal show={props.show} onHide={props.onHide} >
                <Modal.Header closeButton>
                    <Modal.Title>{recipe.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    {/* Foto de la receta*/}
                    <div className="text-center" style={{ maxWidth: '90%', height: 'auto' }}>
                        <img
                            src={recipe.photo}
                            alt="Dish photo"
                            className="img-fluid" 
                            style={{ maxWidth: '100%', maxHeight: '500px' }}
                        />
                    </div>

                    {/* Tabla de ingredientes */}
                    <div className="table-responsive" style={{ maxWidth: '100vw' }}>
                        <table className="table table-striped table-responsive mt-4">
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

                    {/* Instrucciones de preparación de la receta */}
                    <div className="text-left m-1">
                        <h5>Instructions: </h5>
                        <div>{recipe.instructions}</div>
                    </div>
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