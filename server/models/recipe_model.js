const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Recipe title is required"]
    },
    ingredients: [{
        ingredient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ingredient", // Debe coincidir con el nombre del modelo de ingredientes
        },
        measure: {
            type: String,
        },
        qty: {
            type: Number,
        },
    }],
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
