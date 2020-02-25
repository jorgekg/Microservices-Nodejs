const RabbitService = require('./rabbit.service');
const ExpressService = require('./express.service');
const RabbitCacheService = require('./rabbit-cache.service');

module.exports = class MetadataService {

  async createEndpointsByMetadata(server) {
    const express = new ExpressService();
    const rabbitMetadataResult = await new RabbitCacheService().getQueue('bridge.metadata');
    rabbitMetadataResult
      .consume(
        message => express.createEndpoints(message.payload, server),
        () => { }
      );
  }

}