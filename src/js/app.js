'use strict';

const Fastify = require('fastify');
const routers = require('./routes');
const { PREFIX } = require('./config');

const registerRouters = require('./utils/registerRouters');

const app = Fastify({
  logger: true,
});

registerRouters(app, routers, PREFIX);

module.exports = app;
