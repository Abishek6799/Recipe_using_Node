import mongoose from "mongoose";


const recipeSchema = mongoose.Schema({
    name: String,
    procedure: String,
    ingredients:[],
    duration: String,
});

const Recipes = mongoose.model("Reicpes",recipeSchema);

export default Recipes;