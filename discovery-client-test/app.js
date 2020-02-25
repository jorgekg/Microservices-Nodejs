const express = require('express');
const Discovery = require('./../discovery/discovery');

process.env.RABBIT_USER = 'guest';
process.env.RABBIT_PASS = 'guest';
process.env.RABBIT_HOST = 'localhost';
process.env.HEALTH_CHECK = 5000;

const server = express();
server.get('/xpto', (req, res) => {
    res.send('teste');
});
(new Discovery()).client('client-test', server);
server.listen(8763);
