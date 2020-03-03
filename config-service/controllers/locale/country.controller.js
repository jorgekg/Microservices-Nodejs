const sha1 = require('sha1');

const Controller = require('./../controller');
const CountryService = require('./../../services/locale/country.service');

module.exports = class CountryController extends Controller {

  constructor(express) {
    super(express, new CountryService(), '/countries');
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