const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let IngredientSchema = new Schema({
  ingredient: String,
  amount: Schema.Types.Mixed
})

let Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = Ingredient;
