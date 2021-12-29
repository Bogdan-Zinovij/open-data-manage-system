'use strict';

const categoryController = require('../controllers/categoryController');

const setCategoriesRoutes = (fastify, options, done) => {
  fastify
    .get('/', categoryController.getAllItems)
    .post('/', categoryController.createNewItem)

    .get('/:id', categoryController.getItemById)
    .patch('/:id', categoryController.updateItemById)
    .delete('/:id', categoryController.deleteItemById)

    .get('/:id/dataSets', categoryController.getAllDataSetsInCategory);

  done();
};

module.exports = setCategoriesRoutes;
