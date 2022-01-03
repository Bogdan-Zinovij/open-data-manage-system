'use strict';

const Fastify = require('fastify');
const routers = require('./routes');
const { PREFIX } = require('./config');

const createRoutersFunction = require('./utils/registerRouters');

const app = Fastify({
  logger: true,
});

createRoutersFunction(app, routers, PREFIX);

module.exports = app;
