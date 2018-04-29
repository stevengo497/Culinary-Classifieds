const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let RecipeSchema = new Schema({
  recipeName: String,
  user_id: String
})

let Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
