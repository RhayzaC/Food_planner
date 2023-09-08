const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = mongoose.Types;

const UserModel = require("../models/user_model");

module.exports = {
  // I) REGISTER
    register: (req, res) => {
        const newUser = new UserModel(req.body);
        newUser
        .save()
        .then((newUser) => {
            res
            .status(201)
            .json({ message: "User successfully created", user: newUser });
        })
        .catch((err) => {
            if (err.name === "ValidationError") {
            return res
                .status(400)
                .json({ message: "Validation Errors", errors: err });
            }
            res.status(500).json({ message: "Something went wrong", errors: err });
        });
    },

  // II) LOGIN
    login: (req, res) => {
        UserModel.findOne({ email: req.body.email })
        .then((user) => {
            if (user === null) {
            res.status(400).json({ message: "Login Error" });
            } else {
            bcrypt
                .compare(req.body.password, user.password)
                .then((isPasswordValid) => {
                if (isPasswordValid) {

                    const userInfo = {
                    _id: user._id,
                    name: user.name,
                    last_name: user.last_name,
                    email: user.email,
                    };
                    console.log("userInfo: ", userInfo);
                    const userToken = jwt.sign(userInfo, process.env.JWT_SECRET);

                    const cookieOptions = {
                    httpOnly: true,
                    expires: new Date(Date.now() + 900000000),
                    };

                    res
                    .cookie("usertoken", userToken, cookieOptions)
                    .status(200)
                    .json({ message: "Successfully logged in", user: userInfo });
                } else {
                    res.status(400).json({ message: "Login Error" });
                }
                })
                .catch((err) => {
                res.status(400).json({ message: "Login Error" });
                });
            }
        })
        .catch((err) => {
            res.status(400).json({ message: "Login Error" });
        });
    },

// III) LOGOUT
    logout: (req, res) => {
        res.clearCookie("usertoken");
        res.status(200).json({
        message: "You have successfully logged out of our system",
        });
    },
};