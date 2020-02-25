const express = require('express');
const Discovery = require('./../discovery/discovery')

process.env.RABBIT_USER = 'guest';
process.env.RABBIT_PASS = 'guest';
process.env.RABBIT_HOST = 'localhost';
process.env.HEALTH_CHECK = 5000;

const server = express();
(new Discovery()).server(server);
server.listen(8761);