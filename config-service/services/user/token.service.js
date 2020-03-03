const Service = require('./../service');

const Token = require('./../../models/index').Token;

module.exports = class TokenService extends Service {

  constructor() {
    super(Token);
  }

}