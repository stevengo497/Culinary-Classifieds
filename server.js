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

mongoose.connect('mongodb://localhost/simple-login');



// signup route with placeholder response
app.get('/signup', function (req, res) {
  res.render('signup');
});

//use your new createSecure model method to create a user in your database with a secure password.
app.post("/signup", function(req, res){
	User.createSecure(req.body.email, req.body.password, function(err, newUserDocument){
    req.session.userId = newUserDocument.id
    res.json(newUserDocument)
	})
});
//*** changed from user - maybe needs to change to profile?
app.get("/user", function(req, res){
	User.findOne({_id : req.session.userId}, function(err, userRecipes){
		res.render('profile', {recipes : userRecipes})
	})
})
//****changed from sessions
app.post("/sessions", function(req, res){
	User.authenticate(req.body.email, req.body.password, function(err, existingUserDocument){
		// if (err) console.log("error is " + err)
		req.session.userId = existingUserDocument._id
		res.json(existingUserDocument);
	})
})

// login route with placeholder response
app.get('/login', function (req, res) {
  res.render('login');
});
//logout
app.get('/logout', function (req, res) {
  // remove the session user id
  req.session.userId = null;
  // redirect to login (for now)
  res.redirect('/login');
});


app.get('/', function (req, res){
  res.render('index', { root: __dirname})
});
//*** commented out to see
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
