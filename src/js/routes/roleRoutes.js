'use strict';

const roleController = require('../controllers/roleController');

const setRoleRoutes = (fastify, options, done) => {
  fastify
    .get('/', roleController.getAllItems)
    .post('/', roleController.createNewItem)
    .get('/:id', roleController.getItemById)
    .delete('/:id', roleController.deleteItemById)
    .patch('/:id', roleController.updateItemById);

  done();
};

module.exports = setRoleRoutes;
