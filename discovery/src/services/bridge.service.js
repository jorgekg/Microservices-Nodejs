const RabbitService = require('./rabbit.service');

module.exports = class BridgeService {

    async sendToBrigde(metadata) {
        if (process.env.BRIDGE) {
            const rabbit = await (new RabbitService())
                .connect(`bridge.metadata`, false);
            rabbit.send(metadata).then();
        }
    }

}