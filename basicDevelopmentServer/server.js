const express = require('express');
const childProcess = require('child_process');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

/**
 * TODO:
 *
 * 1. Have server open up a new web browser session.
 * 2. Open up a tab with address of url below.
 * 3. If web browser session gets closed then we will need to stop running our server
 *      3.a what does not affect this is if the user has multiple tabs open in the web browser we opened.
 */
server.on('close', () => {
  server.closeAllConnections();
});

// Code below launches a new window or tab with the url below
const url = 'http://localhost:3000';
const getStartCommand = (platformName) => {
  const platformStartCommandMap = {
    darwin: 'open',
    win32: 'start',
    default: 'xdg-open',
  };

  if (!platformStartCommandMap[platformName]) {
    return platformStartCommandMap.default;
  }

  return platformStartCommandMap[platformName];
};

const startCommand = getStartCommand(process.platform);

childProcess.exec(startCommand + ' ' + url);
