module.exports = class ServerService {

    constructor(server, metadataService) {
        this.metadataService = metadataService;
        this.metadataConsume();
        this.metadataWebApp(server);
    }

    metadataConsume() {
        console.log('Discovery consume queue discovery.metadata');
        this.metadataService.map();
    }

    metadataWebApp(server) {
        server.get('/', (_, res) => {
            res.send(this.metadataService.getMetadata());
        });
        console.log('Discovery has started')
    }

}