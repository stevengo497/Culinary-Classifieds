const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./models');
var User = require('./models/user')
var session = require('express-session');

const app = express();


//Middleware
app.set('port', process.env.PORT || 3000)
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minute cookie lifespan (in milliseconds)
}));





app.get('/', function (req, res){
  res.render('index', { root: __dirname})
});

// login route with placeholder response
app.get('/login', function (req, res) {
  res.render('login');
  })
// signup route with placeholder response
app.get('/signup', function (req, res) {
  res.render('signup');
});

//use your new createSecure model method to create a user in your database with a secure password.
app.post("/signup", function(req, res){
	User.createSecure(req.body.email, req.body.password, function(err, newUserDocument){
    req.session.userId = newUserDocument.id
    global.globaluser_id = req.session.userId;
    res.json(newUserDocument)
	})
});

//****changed from sessions
app.post("/sessions", function(req, res){
	User.authenticate(req.body.email, req.body.password, function(err, existingUserDocument){
		if (err) console.log("error is " + err)
		req.session.userId = existingUserDocument._id
    global.globaluser_id = req.session.userId; // provides user_id as global so now can use the id in any controller
		res.json(existingUserDocument);
	})
})


//logout
app.get('/logout', function (req, res) {
  // remove the session user id
  req.session.userId = null;
  // redirect to login (for now)
  res.redirect('/login');
});

//*** commented out to see
app.get('/profile', function (req, res){
  db.Recipe.find({user_id: globaluser_id}, function(err, recipeList) {
    //console.log(global.user_id)
    res.render('profile', {recipes: recipeList})
  })
});

app.post('/profile', function (req, res) {
  req.body.user_id = globaluser_id
  db.Recipe.create(req.body).then(function(newRecipe){
    res.json(newRecipe);
  })
})


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
  // console.log(req.body)
  db.Ingredient.findByIdAndUpdate(req.params.id, req.body, function(err, updatedIngredient){
    res.json(updatedIngredient)
  })
})

//set up port to listen

app.listen(app.get('port'), () => {
  console.log(`✅ PORT: ${app.get('port')} 🌟`)
})
