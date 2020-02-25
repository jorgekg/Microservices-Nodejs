const RabbitService = require('./rabbit.service');

module.exports = class BridgeService {

    async sendToBrigde(metadata) {
        const rabbit = await (new RabbitService())
            .connect(`bridge.metadata.result`, false);
        rabbit.send(metadata).then();
    }

}