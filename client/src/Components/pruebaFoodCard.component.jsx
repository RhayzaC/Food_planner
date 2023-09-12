import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Accordion, Card, Button } from 'react-bootstrap';

import "bootswatch/dist/minty/bootstrap.min.css";

const FoodCardPrueba = (props) => {
    // Hooks and Variables
    const [recipes, setRecipes] = useState([]);
    const [checkedList, setCheckedList] = useState([]);

    useEffect(() => {
        getAllRecipes();
    }, []);

    // Handlers
    const handleSelect = (recipe) => {
        const value = recipe.target.value;
        const isChecked = recipe.target.checked;
        const checkedListToUpdate = isChecked
            ? [...checkedList, value]
            : checkedList.filter(item => item !== value);

        console.log(checkedListToUpdate);
        setCheckedList(checkedListToUpdate);
    };

    // API Functions
    const getAllRecipes = async () => {
        try {
            let res = await axios.get("http://localhost:8000/api/recipe/");
            setRecipes(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // JSX
    const renderRecipes = (category) => {
        const filteredRecipes = recipes.filter(item => item.category === category);

        return (
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{category}</Accordion.Header>
                    <Accordion.Body className="text-info text-left font-weight-light">
                        {filteredRecipes.map((item, idx) => (
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
        );
    };

    return (
        <Card>
            <Card.Title className="font-weight-bold text-center mb-4" style={{ color: "#000" }}>{props.dayName}</Card.Title>
            <Card.Body>
                {renderRecipes("Breakfast")}
                {renderRecipes("Lunch")}
                {renderRecipes("Dinner")}
                {renderRecipes("Snacks")}
            </Card.Body>
        </Card>
    );
};

export default FoodCardPrueba;
