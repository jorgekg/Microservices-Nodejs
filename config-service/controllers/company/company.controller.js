const Controller = require('./../controller');
const CompanyService = require('./../../services/company/company.service');

module.exports = class CompanyController extends Controller {

  constructor(express) {
    super(express, new CompanyService(), '/companies');
  }

}