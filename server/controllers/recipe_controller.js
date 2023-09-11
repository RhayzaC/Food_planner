const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const RecipeModel = require("../models/recipe_model");

module.exports = {
    findAllRecipes: (req, res) => {
        RecipeModel.find({})
        .populate("ingredients")
        .then((allRecipes) => res.status(200).json(allRecipes))
        .catch((err) =>
            res.status(500).json({ message: "Something went wrong", error: err })
        );
    },
    findOneRecipeById: (req, res) => {
        if (!ObjectId.isValid(req.params.id))
        return res
            .status(400)
            .json({ message: "UUID doesn't match the specified format" });
        RecipeModel.findOne({ _id: req.params.id })
        .populate("ingredients")
        .then((oneSingleRecipe) => {
            if (oneSingleRecipe) {
            res.status(200).json(oneSingleRecipe);
            } else {
            res.status(404).json({ message: "Recipe not found" });
            }
        })
        .catch((err) =>
            res.status(500).json({ message: "Something went wrong", error: err })
        );
    },

    createNewRecipe: (req, res) => {
        RecipeModel.create(req.body)
        .then((newRecipe) => RecipeModel.findOne({ _id: newRecipe._id }).populate("ingredients"))
        .then((newRecipePopulated) => res.status(201).json(newRecipePopulated))
        .catch((err) => {
            if (err.name === "ValidationError") {
            return res
                .status(400)
                .json({ message: "Validation Errors", errors: err });
            }
            res.status(500).json({ message: "Something went wrong", errors: err });
        });
    },

    updateOneRecipeById: (req, res) => {
        if (!ObjectId.isValid(req.params.id))
        return res
            .status(400)
            .json({ message: "UUID doesn't match the specified format" });

        const updateOptions = {
        new: true, 
        runValidators: true,
        };

        RecipeModel.findOneAndUpdate({ _id: req.params.id }, req.body, updateOptions).populate("ingredients")
        .then((updatedRecipe) => {
            if (updatedRecipe) {
            res.status(200).json(updatedRecipe);
            } else {
            res.status(404).json({ message: "Recipe not found" });
            }
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
    
    deleteOneRecipeById: (req, res) => {
        if (!ObjectId.isValid(req.params.id))
        return res
            .status(400)
            .json({ message: "UUID doesn't match the specified format" });
        RecipeModel.deleteOne({ _id: req.params.id })
        .then((result) => {
            if (result.deletedCount === 0) {
            res.status(404).json({ message: "Recipe not found" });
            } else {
            res.status(200).json({ messages: "Recipe deleted", result: result });
            }
        })
        .catch((err) =>
            res.status(500).json({ message: "Something went wrong", error: err })
        );
    },
    };