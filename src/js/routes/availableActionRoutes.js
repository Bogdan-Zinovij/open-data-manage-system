'use strict';

// eslint-disable-next-line max-len
const availableActionController = require('../controllers/availableActionController');

const setAvailableActionRoutes = (fastify, options, done) => {
  fastify
    .get('/', availableActionController.getAllItems)
    .post('/', availableActionController.createNewItem)
    .get('/:id', availableActionController.getItemById)
    .delete('/:id', availableActionController.deleteItemById)
    .patch('/:id', availableActionController.updateItemById);

  done();
};

module.exports = setAvailableActionRoutes;
