'use strict';

const stateController = require('../controllers/stateController');

const setStateRoutes = (fastify, options, done) => {
  fastify
    .get('/', stateController.getAllItems)
    .post('/', stateController.createNewItem)

    .get('/:id', stateController.getItemById)
    .delete('/:id', stateController.deleteItemById)
    .patch('/:id', stateController.updateItemById);

  done();
};

module.exports = setStateRoutes;
