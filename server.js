const request = require('request');
const apiKey = 'yourApiKey';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', { weather: null, error: null });
});

app.post('/', function (req, res) {
  let cityName = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  request(url, function (err, response, body) {
    if (err) {
      res.render('index', { weather: null, error: 'An error occurred. Please try again.' });
    } else {
      let weather = JSON.parse(body)
      if (weather.main == undefined) {
        res.render('index', { weather: null, error: 'An error occurred. Please try again.' });
      } else {
        let weatherText = `It's currently ${Math.round(weather.main.temp - 273.15)} degrees in ${weather.name}, ${weather.sys.country}.`;
        res.render('index', { weather: weatherText, error: null });
      }
    }
  });
});

app.listen(3000, function () {
  console.log('Now listening on port 3000')
});




