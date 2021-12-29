'use strict';

const availableForController = require('../controllers/AvailableForController');

const setAvailableForRoutes = (fastify, options, done) => {
  fastify
    .get('/', availableForController.getAllItems)
    .post('/', availableForController.createNewItem)

    .get('/:id', availableForController.getItemById)
    .delete('/:id', availableForController.deleteItemById)
    .patch('/:id', availableForController.updateItemById);

  done();
};

module.exports = setAvailableForRoutes;
