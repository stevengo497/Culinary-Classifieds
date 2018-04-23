const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));






app.get('/', function (req, res){
  res.sendFile('views/index.html', { root: __dirname})
});











//set up port to listen
app.listen(process.env.port || 3000, function(){
  console.log('ready for your command!')
});
