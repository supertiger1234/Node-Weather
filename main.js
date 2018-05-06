const electron = require('electron');
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const weather = require('openweather-apis');
const cities = require("cities-list");
const {ipcMain} = require('electron');
var keys = require('./keys');
weather.setLang('en');
weather.setAPPID(keys.weatherAPI.key);   // Open weather api key here.

app.on('ready', ()=> {
    let win = new BrowserWindow({width:800, height:600, frame: false, show: false});
    win.loadURL(`file://${__dirname}/site/index.html`);
    win.once('ready-to-show', () => {
        win.show()
    })
});

ipcMain.on('getSuggestions', (event, cityPartial) => {
    const newCities = [];
    for(const item of cities) {
        if (item.name.toLowerCase().includes(cityPartial.toLowerCase())){
            newCities.push(item)
        }
    }
    event.sender.send('sendSuggestions', newCities)
});

ipcMain.on('sendWeatherID', (event, ID) => {
    weather.setCityId(ID);
    event.sender.send('sendWeatherIDStatus', true)
    weather.setUnits('metric');
    weather.getAllWeather(function(err, JSONObj){
        console.log(JSONObj);
        event.sender.send('sendWeatherInfo', JSONObj);
    });
});