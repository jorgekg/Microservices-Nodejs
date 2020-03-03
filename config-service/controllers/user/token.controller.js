const sha1 = require('sha1');
const ForbbidenException = require('./../../../commons/exceptions/forbidden.exception');

const Controller = require('./../controller');
const UserService = require('./../../services/user/user.service');
const TokenService = require('./../../services/user/token.service');

module.exports = class TokenController extends Controller {

  constructor(express) {
    super(express, new TokenService(), '/tokens');
  }

  async doPost(req, res) {
    if (!(req.body && req.body.email)) {
      throw new ForbbidenException('E-mail é obrigatório!');
    }
    const users = await (new UserService()).get({email: req.body.email});
    if (users.rows && users.rows.length > 0) {
      const [user] = users.rows;
      if (user.dataValues.password === sha1(req.body.password)) {
        req.body.keyId = sha1(user.dataValues.id + JSON.stringify(Date.now()));
        req.body.userId = user.dataValues.id;
        delete req.body.email;
        delete req.body.password;
        return req.body;
      }
    }
    throw new ForbbidenException('E-mail ou senha inválidos!');
  }

  async doPut(req, res) {
    throw new Error();
  }

  async doGet(req, res) {
    throw new Error();
  }

  async doDelete(req, res) {
    throw new Error();
  }

}