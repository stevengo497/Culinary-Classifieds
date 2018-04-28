const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let IngredientSchema = new Schema({
  ingredient: String,
  amount: Schema.Types.Mixed,
  recipe_id: String
})

let Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = Ingredient;
