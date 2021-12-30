'use strict';

const actionTypeController = require('../controllers/actionTypeController');

const setActionTypeRoutes = (fastify, options, done) => {
  fastify
    .get('/', actionTypeController.getAllItems)
    .post('/', actionTypeController.createNewItem)
    .get('/:id', actionTypeController.getItemById)
    .delete('/:id', actionTypeController.deleteItemById)
    .patch('/:id', actionTypeController.updateItemById);

  done();
};

module.exports = setActionTypeRoutes;
