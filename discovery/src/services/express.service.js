module.exports = class ExpressService {

  getEndpoints(server) {
    const stacks = server._router.stack;
    return stacks.filter(stack => !!stack.route).map(stack => {
      return {
        endpoint: stack.route.path,
        method: stack.route.stack[0].method
      }
    });
  }

  getMethod(server, method, endpoint) {
    const stacks = server._router.stack;
    return stacks
      .filter(stack => !!stack.route && stack.route.path == endpoint)
  }

  async callToExpressMethod(method, message) {
    const uuid = message.payload.uuid;
    return new Promise((resolve, reject) => {
      try {
        let code = 200;
        let type = 'application/json';
        method.handle({
          ...message.payload.request
        },
          {
            sendStatus: statusCode => {
              code = statusCode;
              return { send: (data) => this.send(uuid, data, code, type, resolve) };
            },
            type: statusType => { type = statusType },
            send: data => this.send(uuid, data, code, type, resolve),
          },
          (e) => e);
      } catch (err) {
        reject(err);
      }
    });
  }

  send(uuid, data, code, type, resolve) {
    resolve({
      uuid: uuid,
      type: type,
      code: code,
      data: data
    })
  }

}