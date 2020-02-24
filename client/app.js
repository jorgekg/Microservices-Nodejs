const express = require('express');

const server = express();
server.get('/', (req, res) => {
  res.send('teste');
});

const stacks = server._router.stack;
const endpoints = stacks.filter(stack => !!stack.route).map(stack => {
  return {
    endpoint: stack.route.path,
    method: stack.route.stack[0].method
  }  
});
console.log(endpoints);
console.log(endpoints[0].stack);

