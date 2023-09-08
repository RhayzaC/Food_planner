const express = require("express");

const {
    findAllRecipes,
    findOneRecipeById,
    createNewRecipe,
    updateOneRecipeById,
    deleteOneRecipeById
} = require("../controllers/recipe_controller");

const RecipeRouter = express.Router();

RecipeRouter.get("/", findAllRecipes);
RecipeRouter.get("/:id/", findOneRecipeById);
RecipeRouter.post("/", createNewRecipe);
RecipeRouter.put("/:id/", updateOneRecipeById);
RecipeRouter.delete("/:id/", deleteOneRecipeById);

module.exports = RecipeRouter;