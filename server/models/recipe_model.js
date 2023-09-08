const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Recipe title is required"]
    },
    ingredients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ingredients",
        }
    ],
    quantity: {
        type: Number,
        required: [true, "Quantity is required"]
    },
    // measure: {
    //     type: String,
    //     required: [true, "Measure is required"]
    // },
    servings: {
        type: Number,
        required: [true, "Servings are required"]
    },
    instructions: {
        type: String,
        required: [true, "Recipe instruction is required"]
    },
    photo: {
        type: String,
        required: [true, "Recipe photo is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },

    vegetarian: Boolean,
    healthy: Boolean,
    regular: Boolean,
},
{
    timestamps: true
});

const RecipeModel = mongoose.model("Recipe", recipeSchema);

module.exports = RecipeModel;
