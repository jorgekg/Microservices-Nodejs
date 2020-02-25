const RabbitService = require('./rabbit.service');
const ExpressService = require('./express.service');

module.exports = class MetadataService {

  async createEndpointsByMetadata(server) {
    const express = new ExpressService();
    const rabbitMetadataResult = await (new RabbitService())
      .connect('bridge.metadata', false)
    rabbitMetadataResult
      .consume(
        message => express.createEndpoints(message.payload, server),
        () => {}
      );
  }

}