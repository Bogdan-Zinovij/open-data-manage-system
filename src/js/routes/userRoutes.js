'use strict';

const userController = require('../controllers/userController');

const setUserRoutes = (fastify, options, done) => {
  fastify
    .get('/', userController.getAllItems)
    .post('/', userController.createNewItem)

    .get('/:id', userController.getItemById)
    .delete('/:id', userController.deleteItemById)
    .patch('/:id', userController.updateItemById);

  done();
};

module.exports = setUserRoutes;
