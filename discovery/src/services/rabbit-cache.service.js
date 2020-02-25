const RabbitService = require('./rabbit.service');

module.exports = class RabbitCacheService {

  constructor() {
    this.queues = [];
    this.result = [];
  }

  async getQueue(queueName) {
    if (!this.queues[queueName]) {
      const rabbit = await (new RabbitService())
        .connect(queueName, false);
      this.queues[queueName] = rabbit;
    }
    return this.queues[queueName];
  }

}