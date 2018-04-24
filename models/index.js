const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/culinary-classifieds');

if (process.env.NODE_ENV == "production") {
  mongoose.connect(process.env.MLAB_URL)
} else {
  mongoose.connect("mongodb://localhost/culinary-classifieds");
}

module.exports.Recipe = require('./recipe.js');
