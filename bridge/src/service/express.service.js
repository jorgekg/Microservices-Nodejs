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
          case 'post':
            this.doPost(endpoints.queue, endpoints.service, endpoint.endpoint, server);
            break;
          case 'put':
            this.doPut(endpoints.queue, endpoints.service, endpoint.endpoint, server);
            break;
          case 'delete':
            this.doDelete(endpoints.queue, endpoints.service, endpoint.endpoint, server);
            break;
          case 'get':
          default:
            this.doGet(endpoints.queue, endpoints.service, endpoint.endpoint, server);
            break;
        }
      })
    });
    this.removeOldsEndpoints(server);
  }

  doGet(queue, service, endpoint, server) {
    server.get(`/${service}${endpoint}`, async (req, res) => {
      try {
        const result = await this.doRabbitSend(queue, endpoint, 'get', req);
        res.send(result.data);
      } catch (err) {
        res.status(err.code).send(err.data);
      }
    });
  }

  doPost(queue, service, endpoint, server) {
    server.post(`/${service}${endpoint}`, async (req, res) => {
      try {
        const result = await this.doRabbitSend(queue, endpoint, 'post', req);
        res.send(result.data);
      } catch (err) {
        res.status(err.code).send(err.data);
      }
    });
  }

  doPut(queue, service, endpoint, server) {
    server.put(`/${service}${endpoint}`, async (req, res) => {
      try {
        const result = await this.doRabbitSend(queue, endpoint, 'put', req);
        res.send(result.data);
      } catch (err) {
        res.status(err.code).send(err.data);
      }
    });
  }

  doDelete(queue, service, endpoint, server) {
    server.delete(`/${service}${endpoint}`, async (req, res) => {
      try {
        const result = await this.doRabbitSend(queue, endpoint, 'delete', req);
        res.send(result.data);
      } catch (err) {
        res.status(err.code).send(err.data);
      }
    });
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