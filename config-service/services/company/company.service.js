const Service = require('./../service');

const Company = require('./../../models/index').Company;

module.exports = class CompanyService extends Service {

  constructor() {
    super(Company);
  }

}