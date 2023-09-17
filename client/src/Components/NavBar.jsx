import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiMeal } from "react-icons/gi"; // Import the icon from react-icons
import "bootswatch/dist/minty/bootstrap.min.css";

import axios from "axios";
import _ from "lodash";

const NavBar = (props) => {
  // --------------------------------------------------
  // I) HOOKS AND VARIABLES
  // --------------------------------------------------

    const { setUser } = props;

    // React Router Hooks - Params and Navigation
    const location = useLocation();
    const navigate = useNavigate();

    // Aux Variables
    let currentView;
        if (location.pathname === "/" || location.pathname === "/login") {
            currentView = "LogReg Page";
        } else if (location.pathname === "/recipe/new/" || location.pathname === "/recipe/shoplist/") {
            currentView = "Details Page";
        } else {
            currentView = "Home Page";
        }
    
    // --------------------------------------------------
    // II) HANDLERS AND AUXILIAR FUNCTIONS
    // --------------------------------------------------

    // i) Handlers
    const handleLogout = () => {
        logoutUser();
    };

    // ii) API Calls
    const logoutUser = async () => {
        try {
        await axios.get("http://localhost:8000/api/users/logout",
            { withCredentials: true }
        );
        localStorage.removeItem("user");
        //setUser(null)
        navigate("/")

        } catch (err) {
        console.log("Error: ", err)
        }
    };

    // --------------------------------------------------
    // III) JSX
    // --------------------------------------------------
    return (
        <div >
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary fixed-top">
        <Link to="/" className="navbar-brand d-flex align-items-center">
            <div className="mx-3"> 
                <GiMeal size={50} className= "p-1 mb-1 " />
            </div>
            <h2 className="mx-3 my-0 text-black">Food Planner</h2>
            </Link>
            <div className="d-flex ms-auto">
            {/* Link to HomePage */}
            {currentView === "Details Page" && (
                <Link
                    to="/recipe/"
                    className="nav-link text-white fs-5 text-decoration-underline"
                >
                Home
                </Link>
            )}
            {/* Button for Logout */}
            {(currentView !== "logRegPage" && (currentView === "Home Page" || currentView === "Details Page")) &&(
                <button
                className="btn nav-link text-white fs-5 px-5 text-decoration-underline shadow-none"
                onClick={handleLogout}
                >
                Logout
                </button>
            )}
            </div>
        </nav>
        </div>

    );
};

export default NavBar;