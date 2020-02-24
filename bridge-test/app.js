const express = require('express');
const Bridge = require('./../bridge/bridge')

const server = express();
new Bridge(server);
server.listen(8080);
