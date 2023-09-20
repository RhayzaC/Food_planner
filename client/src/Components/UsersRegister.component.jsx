import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import {baseUrl} from '../config.js';


const UserForm = ({ formType, setUser }) => {
    const [userCredentials, setUserCredentials] = useState({
        first_name: "",
        last_name: "",
        // family_members: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errorMessages, setErrorMessages] = useState({});

    const navigate = useNavigate();

    const handleOnChangeUserFields = (e) => {
        const { name, value } = e.target;
        setUserCredentials({
        ...userCredentials,
        [name]: value,
        });
    };

    const handleOnSubmitRegistration = async (e) => {
        e.preventDefault();
        if (formType === "register") {
            console.log("register is", e.target)
        await registerUser(e.target.value);
        } else {
        await loginUser(e.target.value);
        }
    };

    const registerUser = async () => {
        try {
        const res = await axios.post(
            `${baseUrl}/api/users/register`,
            userCredentials,
            { withCredentials: true }
        );

        setUserCredentials({
            first_name: "",
            last_name: "",
            family_members: "",
            email: "",
            password: "",
            confirmPassword: "",
        });

        loginUser();
        } catch (err) {
        console.log("Error: ", err.response.data);
        updateErrorMessages(err);
        }
    };

    const loginUser = async () => {
        try {
        const res = await axios.post(
            `${baseUrl}/api/users/login`,
            userCredentials,
            { withCredentials: true }
        );

        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/recipe/");
        } catch (err) {
        console.log("Error: ", err.response.data);
        updateErrorMessages(err);
        }
    };

    const updateErrorMessages = (err) => {
        let errorMessagesToUpdate = {};
        if (formType === "register") {
        const errors = err.response.data.errors?.errors;
        errorMessagesToUpdate = _.mapValues(errors, (error) => error.message);
        } else {
        errorMessagesToUpdate = { login: "Invalid Login. Please try again." };
        }
        setErrorMessages(errorMessagesToUpdate);
    };

    return (
        <div className="d-flex bg-primary align-items-center min-vh-200 rounded">
        <div className="py-3 m-2 ">
        <h3 className="text-center text-black text-decoration-underline">
            {formType === "register" ? <span>Register</span> : <span>Login</span>}
        </h3>
        <form onSubmit={handleOnSubmitRegistration} className="m-4 text-black">
            {/* Form Fields */}
            {formType === "register" && (
            <>
                {renderInput("first_name", "First Name", "Mary")}
                {renderInput("last_name", "Last Name", "Brown")}
                {/* {renderInput("family_members", "Family Members", "1,2,3...")} */}
            </>
            )}
                {renderInput("email", "Email", "maryb@example.com")}
                {renderInput("password", "Password", "********")}
                
            {formType === "register" &&
                renderInput("confirmPassword", "Confirm Password", "********")}
            
            {/* Submit Button */}
            <div className="text-center">
            <button
                type="submit"
                className="mt-2 px-4 btn btn-m btn-secondary mx-auto"
            >
                {formType === "register" ? <span>Register</span> : <span>Login</span>}
            </button>
            </div>
        </form>
        </div>
        </div>
    );

    function renderInput(name, label, placeholder) {
        return (
        <div className="mb-3 row text-center" key={name}>
            <label htmlFor={name} className="col-sm-3 col-form-label">
            {label}:
            </label>
            <div className="col-sm-8">
            <input
                type={name === "password" || name === "confirmPassword" ? "password" : "text"}
                id={name}
                name={name}
                placeholder={placeholder}
                onChange={handleOnChangeUserFields}
                value={userCredentials[name]}
                className="form-control"
            />
            <div className="text-danger small text-start">
                {errorMessages[name]}
            </div>
            </div>
        </div>
        );
    }
};

export default UserForm;
