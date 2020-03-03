const sha1 = require('sha1');

const Controller = require('../controller');
const StateService = require('../../services/locale/state.service');

module.exports = class StateController extends Controller {

  constructor(express) {
    super(express, new StateService(), '/states');
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