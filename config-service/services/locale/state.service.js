const Service = require('./../service');

const State = require('./../../models/index').State;

module.exports = class StateService extends Service {

  constructor() {
    super(State);
  }

}