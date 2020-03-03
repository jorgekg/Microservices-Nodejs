const Country = require('./../models/index').Country;
const State = require('./../models/index').State;
const Modules = require('./../models/index').Modules;

module.exports = class Initializer {

  constructor() {
    this.createLocale().then();
  }

  async createLocale() {
    const countries = await Country.findOrCreate({
      where: {
        name: 'Brasil'
      }
    });
    const country = countries[0].dataValues;
    State.findOrCreate({
      where: {
        countryId: country.id,
        name: 'Santa Catarina',
        sigla: 'SC'
      }
    });
    State.findOrCreate({
      where: {
        countryId: country.id,
        name: 'Paraná',
        sigla: 'PR'
      }
    });
    State.findOrCreate({
      where: {
        countryId: country.id,
        name: 'Rio Grande do Sul',
        sigla: 'RS'
      }
    });
    Modules.findOrCreate({
      where: {
        moduleId: 1,
        name: 'Módulo de pessoas'
      }
    });
    Modules.findOrCreate({
      where: {
        moduleId: 2,
        name: 'Módulo de empresas'
      }
    });
    Modules.findOrCreate({
      where: {
        moduleId: 3,
        name: 'Módulo financeiro'
      }
    });
    Modules.findOrCreate({
      where: {
        moduleId: 4,
        name: 'Módulo de portarias'
      }
    });
  }

}