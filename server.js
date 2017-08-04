const express = require('express');
//let port = 3000;
var fs = require('fs');
var app = express();
var hbs = require('hbs');
app.set('view engine','hbs');
//var day = getDay();
hbs.registerPartials(__dirname + '/views/partials');
var weekend = new Array(7);
weekend[0] = 'sunday';
weekend[1] = 'monday';
weekend[2] = 'tuseday';
weekend[3] = 'wednesday';
weekend[4] = 'thursday';
weekend[5] = 'friday';
weekend[6] = 'saturday';
var year = new Date().getFullYear();
hbs.registerHelper('getyear',() => {
    return weekend[new Date().getDay()] + year
   });
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pagetitle: 'wahab is th owner of this'
  });
});
app.use((req,res,next) => {
  res.render('maintain.hbs');
});
app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now} + ${req.method} + ${req.url}`;
  console.log(log);
  fs.appendFile('some.log',log + '\n');
  next();
});
app.get('/about', (req, res) => {
  res.render('about.hbs',{
   title:'that is copyrighted by sawc corporations',
   currentyear: new Date().getFullYear()
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000,()=> {
  console.log('server id loaded on the 3000');
});
