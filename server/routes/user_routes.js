const express = require("express");

const {register, login, logout } = require("../controllers/user_controller");

const UserRouter = express.Router();

UserRouter.post("/register", register);
UserRouter.post("/login", login);
UserRouter.get("/logout", logout);

module.exports = UserRouter;