const Service = require('./../service');

const Country = require('./../../models/index').Country;

module.exports = class CountryService extends Service {

  constructor() {
    super(Country);
  }

}