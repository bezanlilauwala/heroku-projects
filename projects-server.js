const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const math = require('mathjs');

//Set port variable
let port = process.env.PORT || 3000;

//Create express application
let app = express();

//Set view engine and register partials directory
app.set('view-engine', 'hbs');
hbs.registerPartials('./views/partials');

//Register helpers
hbs.registerHelper('getYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('calculate', (text) => {
  return math.eval(text);
});

//Register middleware log function
app.use((req, res, next) => {
  let now = new Date();
  let log = `${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Error connecting to server');
    }
  });
  next();
});

//Get requests
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageName: 'Home'
  });
});

app.get('/calculator', (req, res) => {
  res.render('calculator.hbs', {
    pageName: 'Calculator App'
  });
});

//Listen
app.listen(port, () => {
  console.log(`Starting Server on Port: ${port}`);
});
