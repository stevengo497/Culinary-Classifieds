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
  res.render('profile', {message: 'Profile page!'})
});

app.post('/profile', function (req, res) {
  db.Recipe.create(req.body).then(function(newRecipe){
    res.json(newRecipe);
  })
})

app.get('/profile/ingredient', function (req, res){
  // db.Ingredient.create(req.body).then(function(newIngredient){
  // res.json(newIngredient)
    res.render('ingredient', {message: 'ingredient page!'})
  });








//set up port to listen

app.listen(app.get('port'), () => {
  console.log(`✅ PORT: ${app.get('port')} 🌟`)
})
