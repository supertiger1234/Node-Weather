const electron = require('electron');
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

app.on('ready', ()=> {
    let win = new BrowserWindow({width:800, height:600, frame: false})
    win.loadURL(`file://${__dirname}/site/index.html`)


});