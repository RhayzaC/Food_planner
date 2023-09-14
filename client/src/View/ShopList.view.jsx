import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Layout from '../Templates/Layout.templates';

const ShopList = () => {
    // --------------------------------------------------
    // I) HOOKS AND VARIABLES
    // --------------------------------------------------
    const [recipes, setRecipes] = useState({});
    const [ingredients, setIngredients] = useState({});

    const navigate = useNavigate();
    const { eventId } = useParams();

    useEffect(() => {
        
    }, []);

    // --------------------------------------------------
    // II) HANDLERS AND AUXILIAR FUNCTIONS
    // --------------------------------------------------
    // i) Handlers

    // ii) API Functions


    return (
        <Layout>
        <div>ShopList</div>
        </Layout>
    )
}

export default ShopList