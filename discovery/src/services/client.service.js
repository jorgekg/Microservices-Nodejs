const ExpressService = require('./express.service');
const RequestService = require('./request.service');
const HealthCheckService = require('./health-check');

module.exports = class ClientService {

    constructor(metadata, server, name) {
        this.metadataService = metadata;
        this.sendMetadata(name, server);
        this.consumeRequests(name, server);
    }

    sendMetadata(serviceName, express) {
        this.metadataService.send(serviceName, express);
    }

    async consumeRequests(name, server) {
        const request = new RequestService(name);
        const queue = await request.createQueue(name);
        request.subscribeQueue(queue, async message => {
            const methods = (new ExpressService()).getMethod(server, message.payload.method, message.payload.endpoint);
            if (methods && methods.length > 0) {
                const [method] = methods;
                request.sendResult(
                    await (new ExpressService()).callToExpressMethod(method, message)
                );
            }
        });
    }

    async healthCheck() {
        const healthCheck = new HealthCheckService(this.metadataService);
        healthCheck.clientHealthCheck();
    }

}