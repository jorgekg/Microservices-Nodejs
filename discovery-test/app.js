const express = require('express');
const Discovery = require('./../discovery/discovery')

const server = express();
(new Discovery()).server(server);
server.listen(8761);
