module.exports = class Metadata {
  constructor(metadata) {
    this.service = metadata.service;
    this.address = metadata.address;
    this.queue = metadata.queue;
    this.endpoints = metadata.endpoints;
  }
}