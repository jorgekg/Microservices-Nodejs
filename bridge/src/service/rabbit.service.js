const amqp = require('amqplib/callback_api');

module.exports = class RabbitService {

  constructor() {
    this.connection = null;
    this.channel = null;
    this.durable = false;
    this.queue = '';
  }

  async consume(onMessage, onError, noAck = true) {
    if (!this.channel) {
      throw new Error('Rabbit is not connected, call to method connect()');
    }
    console.log(`Observable queue ${this.queue}`);
    this.channel.consume(
      this.queue,
      message => onMessage(this.doDeserialize(message)),
      { noAck: noAck },
      rabbitErr => onError(rabbitErr)
    )
  }

  async send(metadata) {
    if (!this.channel) {
      throw new Error('Rabbit is not connected, call to method connect()');
    }
    this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(metadata)));
  }

  async connect(queue, durable = false) {
    this.queue = queue;
    this.durable = durable;
    console.log(`Creating queue ${queue} ...`);
    await new Promise((resolve, reject) =>
      amqp.connect(
        `amqp://${process.env.RABBIT_USER || 'guest'}:${process.env.RABBIT_PASS || 'guest'}@${process.env.RABBIT_HOST || 'localhost'}`,
        (rabbitErr, connection) => this.doConnect(rabbitErr, connection, resolve, reject)
      )
    )
    console.log(`Queue ${queue} has created`);
    return this;
  }

  doDeserialize(message) {
    try {
      const payload = message.content.toString();
      console.log(`Rabbit payload ${payload}`);
      return {
        payload: JSON.parse(payload)
      };
    } catch (err) {
      console.log(err);
      return message.content.toString();
    }
  }

  async doConnect(rabbitErr, connect, resolve, reject) {
    if (rabbitErr) {
      reject(rabbitErr);
    }
    this.connection = connect;
    this.connection.createChannel(
      (rabbitErr, channel) => this.doChannel(rabbitErr, channel, resolve, reject)
    )
  }

  doChannel(rabbitErr, channel, resolve, reject) {
    if (rabbitErr) {
      reject(rabbitErr);
    }
    channel.assertQueue(this.queue, { ...this.durable })
    this.channel = channel;
    resolve();
  }

}