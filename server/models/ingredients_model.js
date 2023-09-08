const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Ingredient name is required"]
    },
},
{
    timestamps: true
});

const IngredientModel = mongoose.model("Ingredients", ingredientSchema);

module.exports = IngredientModel;
