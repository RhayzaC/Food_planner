import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Accordion, Pagination } from "react-bootstrap";
import {baseUrl} from '../config.js';

import Layout from "../Templates/Layout.templates";

function AllRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const recipesPerPage = 6;

    useEffect(() => {
        axios
            .get(`${baseUrl}/api/recipe`)
            .then((response) => {
                setRecipes(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener las recetas:", error);
            });
    }, []);

    // Calculate the start and end indices for the current page
    const startIndex = (pageNumber - 1) * recipesPerPage;
    const endIndex = startIndex + recipesPerPage;
    const recipesToDisplay = recipes.slice(startIndex, endIndex);

    // Function to handle page changes
    const handlePageChange = (page) => {
        setPageNumber(page);
    };

    return (
        <Layout>
        <div style={{ minHeight: "100vh" }}>
            <div className="container mt-5">
                <br/>
                <div className="row d-flex align-items-stretch">
                    {recipesToDisplay.map((recipe, index) => (
                        <div className="col-md-4 mb-4 d-flex align-items-stretch" key={index}>
                            <Card>
                                <Card.Img
                                    variant="top"
                                    src={recipe.photo}
                                    style={{ height: "300px", objectFit: "cover" }}
                                    className="circle border img-fluid"
                                />
                                <Card.Body>
                                    <Card.Title className="text-center text-info">
                                        {recipe.title}
                                    </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted text-center">
                                        {recipe.category}
                                    </Card.Subtitle>
                                    <hr />
                                    <div>
                                        <Accordion className="m-1">
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>
                                                    Ingredients / Instructions
                                                </Accordion.Header>
                                                <Accordion.Body className="text-info">
                                                    {recipe.ingredients &&
                                                        recipe.ingredients.map((item, idx) => (
                                                            <ul key={idx} style={{ textAlign: 'left' }}>
                                                                <li>
                                                                    {item.qty}{" "}
                                                                    {item.measure || ""}{" "}
                                                                    {item.ingredient?.name}
                                                                </li>
                                                            </ul>
                                                        ))}
                                                </Accordion.Body>
                                                <hr />
                                                <Accordion.Body style={{ textAlign: 'left' }}>
                                                    {recipe.instructions}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <Pagination>
                    <Pagination.Prev
                        onClick={() => handlePageChange(pageNumber - 1)}
                        disabled={pageNumber === 1}
                    />
                    {Array.from({
                        length: Math.ceil(recipes.length / recipesPerPage),
                    }).map((_, i) => (
                        <Pagination.Item
                            key={i}
                            active={i + 1 === pageNumber}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        onClick={() => handlePageChange(pageNumber + 1)}
                        disabled={
                            pageNumber === Math.ceil(recipes.length / recipesPerPage)
                        }
                    />
                </Pagination>
            </div>
        </div>
        </Layout>
    );
}

export default AllRecipes;
