import React, { useState } from 'react';
import { Accordion, Card, Button, Form } from 'react-bootstrap';

import "bootswatch/dist/minty/bootstrap.min.css";


const FoodCard = () => {
    const [breakfastOptions, setBreakfastOptions] = useState({
        option1: false,
        option2: false,
        option3: false,
    });

    return (
        <Card>
            <Card.Title className="font-weight-bold text-center mb-4" style={{ color: "#000" }}>Lunes</Card.Title>
            <Card.Body>
                <Accordion>
                    <Accordion.Item eventKey="0">
                    <Accordion.Header>Breakfast</Accordion.Header>
                    <Accordion.Body className="text-info text-justify ">
                        Info de los checkboxes
                    <div className="mt-4 px-2">
                        <Button type="submit" className="submit-button btn-primary-info">View Recipe</Button>
                    </div>
                    </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                    
                    <Accordion>
                    <Accordion.Item eventKey="0">
                    <Accordion.Header>Lunch</Accordion.Header>
                    <Accordion.Body className="text-info text-justify ">
                        Info de los checkboxes
                    </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                    {/*Dinner*/}
                    <Accordion>
                    <Accordion.Item eventKey="0">
                    <Accordion.Header>Dinner</Accordion.Header>
                    <Accordion.Body className="text-info text-justify ">
                        Info de los checkboxes
                    </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>

                    <Accordion>
                    <Accordion.Item eventKey="0">
                    <Accordion.Header>Snacks</Accordion.Header>
                    <Accordion.Body className="text-info text-justify ">
                        Info de los checkboxes
                    </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                </Card.Body>
        </Card>

    );
};

export default FoodCard;
