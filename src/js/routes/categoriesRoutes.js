'use strict';

const categoryController = require('../controllers/categoryController');

const setCategoriesRoutes = (fastify, options, done) => {
  fastify
    .get('/', categoryController.getAllCategories)
    .post('/', categoryController.createCategory)

    .get('/:id', categoryController.getCategory)
    .patch('/:id', categoryController.updateCategory)
    .delete('/:id', categoryController.deleteCategory)

    .get('/:id/dataSets', categoryController.getAllDataSetsInCategory);

  done();
};

module.exports = setCategoriesRoutes;
