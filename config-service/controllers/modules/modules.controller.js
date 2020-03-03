const sha1 = require('sha1');

const Controller = require('./../controller');
const ModulesService = require('./../../services/modules/modules.service');

module.exports = class ModulesController extends Controller {

  constructor(express) {
    super(express, new ModulesService(), '/modules');
  }

  async doPost(req, res) {
    throw new Error();
  }

  async doPut(req, res) {
    throw new Error();
  }

  async doDelete(req, res) {
    throw new Error();
  }

}