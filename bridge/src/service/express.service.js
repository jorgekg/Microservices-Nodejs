const RabbitCacheService = require('./rabbit-cache.service');
const Uuid = require('uuid');

module.exports = class ExpressService {

  constructor() {
    this.rabbitCache = new RabbitCacheService();
    this.uuid = Uuid.v4();
  }

  createEndpoints(serviceRegistered, server) {
    this.markRemoveOldsEndpoints(server);
    serviceRegistered.forEach(endpoints => {
      endpoints.endpoints.forEach(endpoint => {
        switch (endpoint.method) {
          case 'get':
            this.doGet(endpoints.queue, endpoint.endpoint, server);
            break;

          default:
            break;
        }
      })
    });
    this.removeOldsEndpoints(server);
  }

  doGet(queue, endpoint, server) {
    server.get(endpoint, async (req, res) => {
      try {
        const result = await this.doRabbitSend(queue, endpoint, 'get', req);
        res.send(result.data);
      } catch (err) {
        res.status(err.code).send(err.data);
      }
    })
  }

  markRemoveOldsEndpoints(server) {
    if (server._router && server._router.length > 0) {
      server._router.stack.forEach(router => {
        if (!!router.route) {
          router.route.path = this.uuid;
        }
      });
    }
  }

  removeOldsEndpoints(server) {
    if (server._router && server._router.length > 0) {
      server._router.stack = server._router.stack
        .filter(router => !router.route || router.route.path != this.uuid);
    }
  }

  async doRabbitSend(queue, endpoint, method, req) {
    const rabbitQueue = await this.rabbitCache.getQueue(queue);
    const uuid = Uuid.v4();
    rabbitQueue
      .send({
        endpoint: endpoint,
        method: method,
        uuid: uuid,
        request: {
          method: method,
          params: req.params,
          query: req.query,
          body: req.body
        }
      });
    return await this.doRabbitResult(queue, uuid);
  }

  async doRabbitResult(queue, uuid) {
    return await this.rabbitCache.subscribeQueueCache(queue, uuid);
  }

}