const TokenService = require('./../services/user/token.service');
const UserService = require('./../services/user/user.service');

module.exports = class Authorization {

  constructor(express) {
    express.use(async (req, res, next) => {
      await this.validateToken(req, res, next);
    });
    this.publicRoutes = [
      {
        route: '/api/v1/users',
        method: 'POST'
      },
      {
        route: '/api/v1/countries',
        method: 'GET'
      },
      {
        route: '/api/v1/tokens',
        method: 'POST'
      },
      {
        route: '/api/v1/states',
        method: 'GET'
      },
      {
        route: '/api/v1/modules',
        method: 'GET'
      }
    ]
  }

  async validateToken(req, res, next) {
    if (this.publicRoutes.some(routes => req.originalUrl.includes(routes.route) && routes.method == req.method)) {
      next();
      return;
    }
    if (req.headers['x-authorization']) {
      const tokenService = new TokenService();
      const tokens = await tokenService.get({
        keyId: req.headers['x-authorization']
      });
      if (tokens.count > 0) {
        await this.createSession(req, tokens);
        next();
      } else {
        res.status(401).send({
          code: 401,
          message: 'Seu usuário não está logado no sistema'
        });
      }
    } else {
      res.status(401).send({
        code: 401,
        message: 'Seu usuário não está logado no sistema'
      });
    }
  }

  async createSession(req, tokens) {
    const userService = new UserService();
    const [token] = tokens.rows;
    const user = await userService.retreave(token.dataValues.userId);
    if (user && user.dataValues) {
      req.session = {
        user: user.dataValues
      };
    }
  }

}