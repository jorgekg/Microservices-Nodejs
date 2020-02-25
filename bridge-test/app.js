const express = require('express');
const Bridge = require('./../bridge/bridge');

process.env.MAX_PULL = 500;
process.env.RABBIT_USER = 'guest';
process.env.RABBIT_PASS = 'guest';
process.env.RABBIT_HOST = 'localhost';

const server = express();
new Bridge(server);
server.listen(8080);
