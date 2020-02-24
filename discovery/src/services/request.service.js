const RabbitService = require('./rabbit.service');

module.exports = class RequestService {

    constructor(name) {
        (new RabbitService())
            .connect(`discovery.${name}.result`, false)
            .then(rabbit => this.rabbit = rabbit);
    }

    async createQueue(name) {
        return await (new RabbitService())
            .connect(`discovery.${name}`, false);
    }

    subscribeQueue(queue, onMessage) {
        queue.consume(message => onMessage(message), err => console.log(err));
    }

    async sendResult(payload) {
        await this.rabbit.send(payload);
    }

}