const mongoose = require('mongoose');

if (process.env.NODE_ENV == "production") {
  mongoose.connect(process.env.MLAB_URL)
} else {
  mongoose.connect("mongodb://localhost/culinary-classifieds");
}

module.exports.Recipe = require('./recipe.js');
module.exports.Ingredient = require('./ingredient.js');
module.exports.User = require('./user.js');
