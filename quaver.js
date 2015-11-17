'use strict';

// const player = require('./lib');

const app = require('app');
const BrowserWindow = require('browser-window');
// require('crash-reporter').start();

// Global window ref
var mainWindow = null;


app.on('window-all-closed', () => {
  // if (process.platform != 'darwin') {
    app.quit();
  // }
});


app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 1200, height: 800});
  mainWindow.loadURL('file://' + __dirname + '/www/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
