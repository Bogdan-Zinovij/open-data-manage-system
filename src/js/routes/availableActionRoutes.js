'use strict';

// eslint-disable-next-line max-len
const availableActionController = require('../controllers/availableActionController');

const setAvailableActionRoutes = (fastify, options, done) => {
  fastify
    .get('/', availableActionController.getAllAvailableActions)
    .post('/', availableActionController.createAvailableAction)
    .get('/:id', availableActionController.getAvailableAction)
    .delete('/:id', availableActionController.deleteAvailableAction)
    .patch('/:id', availableActionController.updateAvailableAction);

  done();
};

module.exports = setAvailableActionRoutes;
