module.exports = class Metadata {
  constructor(metadata) {
    this.uuid = metadata.uuid;
    this.service = metadata.service;
    this.address = metadata.address;
    this.queue = metadata.queue;
    this.endpoints = metadata.endpoints;
    this.memoryUsage = `${Math.round(process.memoryUsage().heapUsed / (1024 * 1024))} MB`;
  }
}