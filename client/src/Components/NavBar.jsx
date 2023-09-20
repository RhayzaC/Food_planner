import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiMeal } from "react-icons/gi";
import "bootswatch/dist/minty/bootstrap.min.css";
import axios from "axios";

import {baseUrl} from '../config.js';

const NavBar = (props) => {
    const { setUser } = props;
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => {
        return location.pathname === path ? "active" : "";
    };

    const isHomePage = location.pathname === "/recipe/";
    const isLoginPage = location.pathname === "/";
    const isNewRecipe = location.pathname === "/recipe/new/";
    const isAllRecipes = location. pathname === "/recipe/all/";
    const isShopList = location.pathname === "/recipe/shoplist";

    const showHomeLink = !isHomePage && !isLoginPage;
    const showRecipes = isHomePage || !isLoginPage && isAllRecipes || isShopList;
    const showAllRecipes = isHomePage || !isLoginPage && isNewRecipe || isShopList;
    const showLogoutButton = !isLoginPage;
    

    const handleLogout = () => {
        logoutUser();
    };

    const logoutUser = async () => {
        try {
            await axios.get(`${baseUrl}/api/users/logout`, {
                withCredentials: true,
            });
            localStorage.removeItem("user");
            navigate("/");
        } catch (err) {
            console.log("Error: ", err);
        }
    };

    return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary fixed-top">
                <div className="container-fluid">
                    <div className="mx-3">
                        <GiMeal size={50} className="p-1 mb-1 text-light" />
                    </div>
                    <h2 className="mx-3 my-0 text-white">Food Planner</h2>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarColor01"
                        aria-controls="navbarColor01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto">
                            {showHomeLink && (
                                <li className="nav-item">
                                    <Link to="/recipe/" className={`nav-link text-light mx-3`}>
                                        <b>Home</b>
                                    </Link>
                                </li>
                            )}
                            {showRecipes && (
                                <li className="nav-item">
                                    <Link to="/recipe/new/" className={`nav-link text-white mx-3`}>
                                        <b>New Recipe</b>
                                    </Link>
                                </li>
                            )}
                            {showAllRecipes && (
                                <li className="nav-item">
                                    <Link to="/recipe/all/" className={`nav-link text-white mx-3`}>
                                        <b>All Recipes</b>
                                    </Link>
                                </li>
                            )}
                        </ul>
                        {showLogoutButton && (
                            <button
                                className="btn btn-outline-info text-light mx-4"
                                onClick={handleLogout}
                            >
                                <b>Logout</b>
                            </button>
                        )}
                    </div>
                </div>
            </nav>
    );
};

export default NavBar;
