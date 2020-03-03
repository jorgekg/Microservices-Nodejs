const express = require('express');
const bodyParser = require('body-parser');
const Bridge = require('./../bridge/bridge');

const Authorization = require('./authorization/authorization');
const Initializer = require('./initializer/initializer');
const UserController = require('./controllers/user/user.controller');
const TokenController = require('./controllers/user/token.controller');
const CountryController = require('./controllers/locale/country.controller');
const StateController = require('./controllers/locale/state.controller');
const CompanyController = require('./controllers/company/company.controller');
const ModulesController = require('./controllers/modules/modules.controller');

process.env.MAX_PULL = 500;
process.env.RABBIT_USER = 'guest';
process.env.RABBIT_PASS = 'guest';
process.env.RABBIT_HOST = 'localhost';

const server = express();
server.use(bodyParser.json());

const route = express.Router();

new Initializer(route);

new Authorization(route);
new UserController(route);
new TokenController(route);
new CountryController(route);
new StateController(route);
new CompanyController(route);
new ModulesController(route);

new Bridge(route);

server.use('/api/v1', route);

server.listen(3000);