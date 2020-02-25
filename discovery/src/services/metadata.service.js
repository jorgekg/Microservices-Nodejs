const Uuid = require('uuid');

const RabbitService = require('./rabbit.service');
const Metadata = require('./../models/metadata.model');
const ExpressService = require('./express.service');
const BridgeService = require('./bridge.service');

module.exports = class MetadataService {

  constructor() {
    this.metadata = []
    this.bridge = new BridgeService();
    this.uuid = Uuid.v4();
  }

  async map() {
    const rabbit = await (new RabbitService())
      .connect(`discovery.metadata`, false);
    rabbit
      .consume(
        message => this.doMap(message),
        () => {},
        true
      );
  }

  doMap(message) {
    const metadata = new Metadata(message.payload);
    if (metadata.service) {
      this.metadata.push(metadata);
      console.log(`Register service ${metadata.service}`);
    }
    this.bridge.sendToBrigde(this.metadata);
  }

  async send(name, service) {
    const rabbit = await (new RabbitService())
      .connect('discovery.metadata', false);
    const metadata = new Metadata({
      uuid: this.uuid,
      service: name,
      address: '',
      queue: `discovery.${name}`,
      endpoints: (new ExpressService()).getEndpoints(service)
    });
    rabbit.send(metadata);
  }

  updateHealthCheck(uuid, memoryUsage) {
    this.metadata.forEach(metadata => {
      if (metadata.uuid === uuid) {
        metadata.healthCheck = 0;
        metadata.memoryUsage = memoryUsage;
      }
    });
  }

  remove(uuid) {
    this.metadata = this.metadata.filter(metadata => metadata.uuid !== uuid);
    this.bridge.sendToBrigde(this.metadata);
  }

  getMetadata() {
    return this.metadata;
  }

}