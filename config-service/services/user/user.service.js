const Service = require('./../service');
const ConflictException = require('./../../../commons/exceptions/conflict.exception');
const User = require('./../../models/index').User;

module.exports = class UserService extends Service {

  constructor() {
    super(User);
  }

  async doCreate(body) {
    const users = await this.get({ email: body.email });
    if (users.count > 0) {
      throw new ConflictException('Este e-mail não está disponível para utilização');
    }
    return body;
  }

  async doUpdate(body) {
    const users = await this.get({ email: body.email });
    if (users.count > 0) {
      throw new ConflictException('Este e-mail não está disponível para utilização');
    }
    return body;
  }

}