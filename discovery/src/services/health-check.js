const RabbitService = require('./rabbit.service');

module.exports = class HealthCheckService {

  constructor(metadataService) {
    this.metadataService = metadataService;
  }

  async consumer() {
    this.serverHealthCheck();
    const rabbit = await (new RabbitService)
      .connect('discovery.health-check');
    rabbit
      .consume(message => this.doConsumer(message.payload), err => console.log(err));
  }

  async send() {
    const rabbit = await (new RabbitService)
      .connect('discovery.health-check');
    rabbit
      .send({
        uuid: this.metadataService.uuid
      });
  }

  doConsumer(services) {
    this.metadataService.updateHealthCheck(services.uuid);
  }

  serverHealthCheck() {
    setInterval(() => {
      console.log('executing health check...');
      this.metadataService.getMetadata()
        .forEach(metadata => {
          if (!metadata.healthCheck) {
            metadata.healthCheck = 0;
          }
          metadata.healthCheck++;
          if (metadata.healthCheck > 2) {
            this.metadataService.remove(metadata.uuid);
          }
        });
    }, 30000)
  }

  clientHealthCheck() {
    setInterval(() => {
      console.log('Send health check...');
      this.send()
          .catch(err => console.log('Not send health check: ', err));
  }, 30000);
  }
}