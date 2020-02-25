const ServerService = require('./src/services/server.service');
const ClientService = require('./src/services/client.service');
const MetadataService = require('./src/services/metadata.service');

module.exports = class Discovery {

  async server(server) {
    try {
      console.log('Starting discovery server...');
      const discoveryService = new ServerService(server, new MetadataService());
      await discoveryService.healthCheck();
      console.log('Discovery has started!');
    } catch (err) {
      console.log('Ocurred erro on start discovery: ', err);
    }
  }

  async client(serviceName, express) {
    try {
      console.log('Starting client discovery...')
      const client = new ClientService(new MetadataService(), express, serviceName);
      await client.healthCheck();
      console.log('Client discovery has started!');
    } catch (err) {
      console.log('Ocurred erro on start client discovery: ', err);
    }
  }

}