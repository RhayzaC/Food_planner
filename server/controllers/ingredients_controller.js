const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const IngredientModel = require("../models/ingredients_model");

module.exports = {
    findAllIngredients: (req, res) => {
        IngredientModel.find({})
        .then((allIngredients) => res.status(200).json(allIngredients))
        .catch((err) =>
            res.status(500).json({ message: "Something went wrong", error: err })
        );
    },
    findOneIngredientById: (req, res) => {
        if (!ObjectId.isValid(req.params.id))
        return res
            .status(400)
            .json({ message: "UUID doesn't match the specified format" });
        IngredientModel.findOne({ _id: req.params.id })
        .then((oneSingleIngredient) => {
            if (oneSingleIngredient) {
            res.status(200).json(oneSingleIngredient);
            } else {
            res.status(404).json({ message: "Ingredient not found" });
            }
        })
        .catch((err) =>
            res.status(500).json({ message: "Something went wrong", error: err })
        );
    },

    createNewIngredient: (req, res) => {
        IngredientModel.create(req.body)
        .then((newIngredient) => IngredientModel.findOne({ _id: newIngredient._id }))
        .then((newIngredientPopulated) => res.status(201).json(newIngredientPopulated))
        .catch((err) => {
            if (err.name === "ValidationError") {
            return res
                .status(400)
                .json({ message: "Validation Errors", errors: err });
            }
            res.status(500).json({ message: "Something went wrong", errors: err });
        });
    },

    updateOneIngredientById: (req, res) => {
        if (!ObjectId.isValid(req.params.id))
        return res
            .status(400)
            .json({ message: "UUID doesn't match the specified format" });

        const updateOptions = {
        new: true, 
        runValidators: true,
        };

        IngredientModel.findOneAndUpdate({ _id: req.params.id }, req.body, updateOptions)
        .then((updatedIngredient) => {
            if (updatedIngredient) {
            res.status(200).json(updatedIngredient);
            } else {
            res.status(404).json({ message: "Ingredient not found" });
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

    deleteOneIngredientById: (req, res) => {
        if (!ObjectId.isValid(req.params.id))
        return res
            .status(400)
            .json({ message: "UUID doesn't match the specified format" });
        IngredientModel.deleteOne({ _id: req.params.id })
        .then((result) => {
            if (result.deletedCount === 0) {
            res.status(404).json({ message: "Ingredient not found" });
            } else {
            res.status(200).json({ messages: "Ingredient deleted", result: result });
            }
        })
        .catch((err) =>
            res.status(500).json({ message: "Something went wrong", error: err })
        );
    },
    };