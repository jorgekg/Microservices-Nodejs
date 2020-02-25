const express = require('express');
const Discovery = require('./../discovery/discovery');


const server = express();
server.get('/xpto2', (req, res) => {
    res.send('teste');
});
(new Discovery()).client('client-test', server);
server.listen(8763);

