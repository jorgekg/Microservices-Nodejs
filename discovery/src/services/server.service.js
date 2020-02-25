const HealthCheckService = require('./health-check');

module.exports = class ServerService {

    constructor(server, metadataService) {
        this.metadataService = metadataService;
        this.metadataConsume();
        this.metadataWebApp(server);
    }

    metadataConsume() {
        console.log('Discovery consume queue discovery.metadata!');
        this.metadataService.map();
    }

    metadataWebApp(server) {
        console.log('Discovery web app its working!')
        server.get('/', (_, res) => {
            res.send(this.metadataService.getMetadata());
        });
    }

    async healthCheck() {
        await (new HealthCheckService(this.metadataService))
            .consumer();
    }

}