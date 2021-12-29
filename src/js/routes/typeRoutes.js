'use strict';

const typeController = require('../controllers/typeController');

const setTypeRoutes = (fastify, options, done) => {
  fastify
    .get('/', typeController.getAllItems)
    .post('/', typeController.createNewItem)

    .get('/:id', typeController.getItemById)
    .delete('/:id', typeController.deleteItemById)
    .patch('/:id', typeController.updateItemById);

  done();
};

module.exports = setTypeRoutes;
