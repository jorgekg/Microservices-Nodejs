const ServerService = require('./src/services/server.service');
const ClientService = require('./src/services/client.service');
const MetadataService = require('./src/services/metadata.service');

module.exports = class Discovery {

  server(server) {
    new ServerService(server, new MetadataService());
  }

  client(serviceName, express) {
    new ClientService(new MetadataService(), express, serviceName);
  }

}