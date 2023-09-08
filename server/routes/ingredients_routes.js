const express = require("express");

const {
    findAllIngredients,
    findOneIngredientById,
    createNewIngredient,
    updateOneIngredientById,
    deleteOneIngredientById
} = require("../controllers/ingredients_controller");

const IngredientRouter = express.Router();

IngredientRouter.get("/", findAllIngredients);
IngredientRouter.get("/:id/", findOneIngredientById);
IngredientRouter.post("/", createNewIngredient);
IngredientRouter.put("/:id/", updateOneIngredientById);
IngredientRouter.delete("/:id/", deleteOneIngredientById);

module.exports = IngredientRouter;