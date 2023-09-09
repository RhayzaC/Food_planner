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
    let data = req.body;
    
    if (!Object.keys(data).includes("password")) {
        return res.status(500).json({ error: "No envió password" });
    }
    
    UserModel.findOne({ email: data["email"] })
        .then((user) => {
            if (user) {
                bcrypt.compare(data["password"], user.password, function (err, result) {
                    if (result) {
                        const userInfo = {
                            _id: user._id,
                            name: user.first_name,
                            email: user.email,
                        };
                    const token = jwt.sign(userInfo, process.env.SECRET);
                    
                    console.log("Secret key:", process.env.SECRET);
                    const cookieOptions = {
                        httpOnly: true,
                        expires: new Date(Date.now() + 900000000),
                    };
                    return res.cookie("token", token, cookieOptions)
                    .status(200)
                    .json({ success: true, user: userInfo });
                } else {
                    res.status(401).json({ error: "Email and password combination doesn't match" });
                }
            });
        } else {
            res.status(404).json({ error: "Combinación email y clave no existen" });
        }
    })
    .catch((error) => {
        res.status(500).json({ error });
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