const RabbitService = require('./rabbit.service');
const Metadata = require('./../models/metadata.model');

module.exports = class MetadataService {

  constructor() {
    this.metadata = []
  }

  async map() {
    const rabbit = await (new RabbitService())
      .connect(`${process.env.RABBIT_METADATA_QUEUE || 'discovery.metadata'}`, false);
    rabbit
      .consume(
        message => {
          const metadata = new Metadata(message.payload);
          if (metadata.service) {
            this.metadata.push(metadata);
            console.log(`Register service ${metadata.service}`);
          }
        },
        err => console.log(err),
        true
      );
  }

  getMetadata() {
    return this.metadata;
  }

}