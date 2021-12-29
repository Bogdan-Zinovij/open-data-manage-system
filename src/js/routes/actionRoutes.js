'use strict';

const actionController = require('../controllers/actionController');

const setActionRoutes = (fastify, options, done) => {
  fastify
    .get('/', actionController.getAllItems)
    .post('/', actionController.createNewItem)

    .get('/:id', actionController.getItemById)
    .delete('/:id', actionController.deleteItemById)
    .patch('/:id', actionController.updateItemById);

  done();
};

module.exports = setActionRoutes;
