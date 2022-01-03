'use strict';

const { ROUTER_WORD_LENGTH } = require('../config');

const registerRouters = (fastify, routers, prefix = '/') => {
  const routersArr = Object.keys(routers);

  for (const router of routersArr) {
    const routeNameLength = router.length - ROUTER_WORD_LENGTH;
    const routePrefix = prefix + router.slice(0, routeNameLength);
    fastify.register(routers[router], { prefix: routePrefix });
  }
};

module.exports = registerRouters;
