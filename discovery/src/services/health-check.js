const RabbitService = require('./rabbit.service');
const RabbitCacheService = require('./rabbit-cache.service');
const Metadata = require('./../models/metadata.model');

module.exports = class HealthCheckService {

  constructor(metadataService) {
    this.metadataService = metadataService;
    this.rabbitCache = new RabbitCacheService();
  }

  async consumer() {
    this.serverHealthCheck();
    const rabbit = await this.doConnect();
    rabbit
      .consume(message => this.doConsumer(message.payload), err => console.log(err));
  }

  async send() {
    const rabbit = await this.doConnect();
    rabbit
      .send({
        ...new Metadata({ uuid: this.metadataService.uuid })
      });
  }

  async doConnect() {
    return await this.rabbitCache.getQueue('discovery.health-check');
  }

  doConsumer(services) {
    this.metadataService.updateHealthCheck(services.uuid, services.memoryUsage);
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
    }, process.env.HEALTH_CHECK || 30000)
  }

  clientHealthCheck() {
    setInterval(() => {
      console.log('Send health check...');
      this.send()
        .catch(err => console.log('Not send health check: ', err));
    }, process.env.HEALTH_CHECK || 30000);
  }
}