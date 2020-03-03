const Controller = require('./../controller');
const UserService = require('./../../services/user/user.service');

module.exports = class UserController extends Controller {

  constructor(express) {
    super(express, new UserService(), '/users');
  }

}