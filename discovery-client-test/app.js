const express = require('express');
const Discovery = require('./../discovery/discovery');

process.env.RABBIT_USER = 'guest';
process.env.RABBIT_PASS = 'guest';
process.env.RABBIT_HOST = 'localhost';
process.env.HEALTH_CHECK = 5000;

const server = express();
server.get('/xpto/:id', (req, res) => {
    res.send('teste');
});
server.post('/xpto2', (_, res) => {
    res.send('ok');
});
server.put('/xpto3', (_, res) => {
    res.send('put');
});
server.delete('/xpto4', (_, res) => {
    res.send('delete');
});
server.get('/xpto4', (_, res) => {
    res.send('get');
});
(new Discovery()).client('client-test', server);
server.listen(8763);
