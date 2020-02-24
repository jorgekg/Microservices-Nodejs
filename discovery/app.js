const express = require('express');
const MetadataService = require('./src/services/metadata.service');

const server = express();

const metadataService = new MetadataService();
metadataService.map();

server.get('/', (_, res) => {
  res.send(metadataService.getMetadata());
});
server.get('/registered', (_, res) => {
  console.log('aqui');
  res.send(metadataService.getMetadata());
})

server.listen(8761, () => console.log('Discovery has started on port 8761'));
const teste = server._router.stack[3].route
console.log(teste.stack[0]);
teste.stack[0].handle()
