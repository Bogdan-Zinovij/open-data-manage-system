'use strict';

const grantController = require('../controllers/grantController');

const setGrantRoutes = (fastify, options, done) => {
  fastify
    .get('/', grantController.getAllGrants)
    .post('/', grantController.createGrant)
    .get('/:id', grantController.getGrant)
    .delete('/:id', grantController.deleteGrant)
    .patch('/:id', grantController.updateGrant);

  done();
};

module.exports = setGrantRoutes;
