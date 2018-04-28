const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./models');
const app = express();


//Middleware
app.set('port', process.env.PORT || 3000)
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));




app.get('/', function (req, res){
  res.render('index', { root: __dirname})
});

app.get('/profile', function (req, res){
  db.Recipe.find(function(err, recipeList) {
    res.render('profile', {recipes: recipeList})
  })
});

app.post('/profile', function (req, res) {
  db.Recipe.create(req.body).then(function(newRecipe){
    res.json(newRecipe);
  })
})



// app.get('/profile/ingredient', function (req, res){
//   db.Ingredient.find(function(err, ingredientList){
//   res.render('ingredient', {ingredients: ingredientList})
//   })
// });

app.post('/profile/ingredient', function (req, res){
  db.Ingredient.create(req.body).then(function(newIngredient){
    res.json(newIngredient);
  })
})


app.get('/profile/ingredient/:id', function (req, res){
  db.Ingredient.find({recipe_id: req.params.id}, function(err, recipeIngredients) {
    res.render('ingredient', {ingredients: recipeIngredients, recipe_id: req.params.id})
  })
});


app.delete('/profile/ingredient/:id', function (req, res){
  db.Ingredient.findOneAndRemove({_id: req.params.id}, function(err, goneIngredient) {
    res.json(req.params.id)
  })
});

app.delete('/profile/:id', function (req, res){
  db.Recipe.findOneAndRemove({_id: req.params.id}, function(err, goneRecipe) {
    res.json(req.params.id)
  })
});


app.put('/profile/ingredient/:id', function (req, res) {
  console.log(req.body)
  db.Ingredient.findByIdAndUpdate(req.params.id, req.body, function(err, updatedIngredient){
    res.json(updatedIngredient)
  })
})

//set up port to listen

app.listen(app.get('port'), () => {
  console.log(`✅ PORT: ${app.get('port')} 🌟`)
})
