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

  async subscribeQueueCache(queue, uuid) {
    if (!this.queues[`${queue}.result`]) {
      const rabbitQueue = await this.getQueue(`${queue}.result`);
      rabbitQueue.consume(message => this.doMessage(message), err => console.log(err));
    }
    return new Promise((resolve, reject) => {
      let maxPull = process.env.MAX_PULL || 350;
      const interval = setInterval(() => {
        if (this.result[uuid]) {
          resolve(this.result[uuid]);
          this.result[uuid] = null;
          clearInterval(interval);
        }
        if (maxPull <= 0) {
          reject({
            code: 504,
            data: 'Application timeout!'
          });
          clearInterval(interval);
        }
        maxPull--;
      }, 20);
    })
  }

  async doMessage(message) {
    this.result[message.payload.uuid] = message.payload;
  }

}