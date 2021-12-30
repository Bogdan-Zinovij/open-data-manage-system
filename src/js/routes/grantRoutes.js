'use strict';

const grantController = require('../controllers/grantController');

const setGrantRoutes = (fastify, options, done) => {
  fastify
    .get('/', grantController.getAllItems)
    .post('/', grantController.createNewItem)
    .get('/:id', grantController.getItemById)
    .delete('/:id', grantController.deleteItemById)
    .patch('/:id', grantController.updateItemById);

  done();
};

module.exports = setGrantRoutes;
