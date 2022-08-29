
const path = require('path');

const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.watch('public');

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

const { WebSocketServer } = require('ws')

const wss = new WebSocketServer({ port: 3001 });

const express = require('express')
const app = express()

app.use(connectLivereload());

app.use(express.static('public'))

const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const serialport = new SerialPort({
    path: '/dev/ttyUSB0',
    baudRate: 9600
});

parser = serialport.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on("data", (data) => {
    wss.clients.forEach(client => {
        client.send(data);
    })
})

app.listen(3000, () => {
  console.log(`Flicky app listening on http://localhost:3000 and ws://localhost:3001`)
})