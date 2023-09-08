const express = require("express");

const {register, login, logout } = require("../controllers/user_controller");

// 3) Create Router Instance
const UserRouter = express.Router();

// 4) Link Routes with Controller Methods
UserRouter.post("/register", register);
UserRouter.post("/login", login);
UserRouter.get("/logout", logout);

// 5) Exporting Router
module.exports = UserRouter;