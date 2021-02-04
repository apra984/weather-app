const request = require('request');
const argv = require('yargs').argv;

let apiKey = 'yourAPIkey';
let cityName = argv.c || 'auckland';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

request(url,function(err,response,body){
    if(err){
        console.log('error:', error);
    }else{
        let weather = JSON.parse(body);
        let message = `It is currently ${Math.round(weather.main.temp - 273.15)} degrees in ${weather.name}, ${weather.sys.country}.`;
        console.log(message);
    }
});

