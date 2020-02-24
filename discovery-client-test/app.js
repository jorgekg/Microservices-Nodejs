const express = require('express');
const Discovery = require('./../discovery/discovery');

const server = express();
server.get('/xpto', (_, res) => {
    res.send('teste');
});
(new Discovery()).client('bridge', server);
server.listen(8763);
