const RabbitService = require('./rabbit.service');
const Metadata = require('./../models/metadata.model');
const ExpressService = require('./express.service');
const BridgeService = require('./bridge.service');

module.exports = class MetadataService {

  constructor() {
    this.metadata = []
    this.bridge = new BridgeService();
  }

  async map() {
    const rabbit = await (new RabbitService())
      .connect(`discovery.metadata`, false);
    rabbit
      .consume(
        message => {
          const metadata = new Metadata(message.payload);
          if (metadata.service) {
            this.metadata.push(metadata);
            console.log(`Register service ${metadata.service}`);
          }
          if (metadata.service === 'bridge') {
            this.bridge.sendToBrigde(this.metadata);
          }
        },
        err => console.log(err),
        true
      );
  }

  async send(name, service) {
    const rabbit = await (new RabbitService())
      .connect('discovery.metadata', false);
    const metadata = new Metadata({
      service: name,
      address: '',
      queue: `discovery.${name}`,
      endpoints: (new ExpressService()).getEndpoints(service)
    });
    rabbit.send(metadata);
  }

  getMetadata() {
    return this.metadata;
  }

}