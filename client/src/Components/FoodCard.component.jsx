import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Accordion, Card, Button, Form } from 'react-bootstrap';

import "bootswatch/dist/minty/bootstrap.min.css";

const FoodCard = (props) => {
// --------------------------------------------------
    // I) HOOKS AND VARIABLES
    // --------------------------------------------------
    const [recipes, setRecipes] = useState([]);
    const [checkedList, setCheckedList] = useState([])

    useEffect(() => {
        getAllRecipes();
    }, []);

    // --------------------------------------------------
    // II) HANDLERS AND AUXILIAR FUNCTIONS
    // --------------------------------------------------
    // i) Handlers
    const handleSelect = (recipe) => {
        const value = recipe.target.value;
        const isChecked = recipe.target.checked;
        const chekedListToUpdate = (isChecked) 
            ? [...checkedList, value]
            : checkedList.filter(item => item !== value)
        console.log(chekedListToUpdate);
        setCheckedList(chekedListToUpdate);
        console.log(checkedList)
    };

    // ii) API Functions
    const getAllRecipes = async () => {
        try {
            let res = await axios.get("http://localhost:8000/api/recipe/");
            setRecipes(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // --------------------------------------------------
    // III) JSX
    // --------------------------------------------------
    return (
        <Card>
            <Card.Title className="font-weight-bold text-center mb-4" style={{ color: "#000" }}>{props.dayName}</Card.Title>
            <Card.Body>
                {/* Breakfast */}
                <Accordion>
                    <Accordion.Item eventKey="0">
                    <Accordion.Header>Breakfast</Accordion.Header>
                    <Accordion.Body className="text-info text-left font-weight-light">
                        {recipes.map && recipes.map((item, idx) => (
                                        <div key={idx} className="checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="recipes"
                                                value={item._id}
                                                onChange={handleSelect}
                                                checked={checkedList.includes(item._id)}
                                            />
                                            <label>{item.title}</label>
                                        </div>
                        ))}
                    {/* <div className="mt-4 px-2">
                        <Button type="submit" className="submit-button btn-primary-info">View Recipe</Button>
                    </div> */}
                    </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                {/* Lunch */}
                <Accordion>
                    <Accordion.Item eventKey="0">
                    <Accordion.Header>Lunch</Accordion.Header>
                    <Accordion.Body className="text-info text-justify ">
                        {recipes.map && recipes.map((item, idx) => (
                                        <div key={idx} className="checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="recipes"
                                                value={item._id}
                                                onChange={handleSelect}
                                                checked={checkedList.includes(item._id)}
                                            />
                                            <label>{item.title}</label>
                                        </div>
                        ))}
                    </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                {/*Dinner*/}
                <Accordion>
                    <Accordion.Item eventKey="0">
                    <Accordion.Header>Dinner</Accordion.Header>
                    <Accordion.Body className="text-info text-justify ">
                        {recipes.map && recipes.map((item, idx) => (
                                        <div key={idx} className="checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="recipes"
                                                value={item._id}
                                                onChange={handleSelect}
                                                checked={checkedList.includes(item._id)}
                                            />
                                            <label>{item.title}</label>
                                        </div>
                        ))}
                    </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                {/* Snacks */}
                <Accordion>
                    <Accordion.Item eventKey="0">
                    <Accordion.Header>Snacks</Accordion.Header>
                    <Accordion.Body className="text-info text-justify ">
                        {recipes.map && recipes.map((item, idx) => (
                                        <div key={idx} className="checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="recipes"
                                                value={item._id}
                                                onChange={handleSelect}
                                                checked={checkedList.includes(item._id)}
                                            />
                                            <label>{item.title}</label>
                                        </div>
                        ))}
                    </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card.Body>
        </Card>

    );
};

export default FoodCard;
