const MetadataService = require('./metadata');

module.exports = class BridgeService {

    async initializer(server) {
        const metadataService = new MetadataService();
        await metadataService.createEndpointsByMetadata(server);
        console.log('Bridge has started!');
    }

}