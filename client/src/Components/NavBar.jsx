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

  // Destructuring Props
    const { setUser } = props;

    // React Router Hooks - Params and Navigation
    const location = useLocation();
    const navigate = useNavigate();

    // Aux Variables
    let currentView;
    if (location.pathname === "/") currentView = "homePage";
    else if (location.pathname === "/login") currentView = "logRegPage";
    else currentView = "detailsPage";

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
    }

    // --------------------------------------------------
    // III) JSX
    // --------------------------------------------------
    return (
        <nav className="navbar navbar-dark bg-secondary rounded">
        <div className="container-fluid">
            <Link to="/" className="navbar-brand d-flex align-items-center">
            <GiMeal size={50} className="p-1" />
            <h2 className="mx-3 my-0 text-dark">Food Planner</h2>
            </Link>
            <div className="d-flex ms-auto">
            {/* Link to HomePage */}
            {currentView !== "logRegPage" && currentView !== "homePage" && (
                <Link
                to="/"
                className="nav-link text-white fs-5 mx-2 text-decoration-underline"
                >
                Home
                </Link>
            )}
            {/* Button for Logout */}
            {currentView !== "logRegPage" && (
                <button
                className="btn nav-link text-white fs-5 mx-2 text-decoration-underline shadow-none"
                onClick={handleLogout}
                >
                Logout
                </button>
            )}
            </div>
        </div>
        </nav>
    );
};

export default NavBar;