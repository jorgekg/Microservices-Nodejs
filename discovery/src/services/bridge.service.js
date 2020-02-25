const RabbitService = require('./rabbit.service');

module.exports = class BridgeService {

    async sendToBrigde(metadata) {
        const rabbit = await (new RabbitService())
            .connect(`bridge.metadata`, false);
        rabbit.send(metadata).then();
    }

}