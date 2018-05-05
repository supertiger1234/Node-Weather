const electron = require('electron');
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const weather = require('openweather-apis');
const cities = require("cities-list");
const {ipcMain} = require('electron');



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

