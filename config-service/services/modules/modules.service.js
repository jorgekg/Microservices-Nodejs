const Service = require('./../service');

const Modules = require('./../../models/index').Modules;

module.exports = class ModulesService extends Service {

  constructor() {
    super(Modules);
  }

}