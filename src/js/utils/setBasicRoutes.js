'use strict';

const setBasicRoutes = controller => (fastify, options, done) => {
  fastify
    .get('/', controller.getAllItems)
    .post('/', controller.createNewItem)

    .get('/:id', controller.getItemById)
    .delete('/:id', controller.deleteItemById)
    .patch('/:id', controller.updateItemById);

  done();
};

module.exports = setBasicRoutes;
