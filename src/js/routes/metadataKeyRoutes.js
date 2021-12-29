'use strict';

const metadataKeyController = require('../controllers/metadataKeyController');

const setMetadataKeyRoutes = (fastify, options, done) => {
  fastify
    .get('/', metadataKeyController.getAllItems)
    .post('/', metadataKeyController.createNewItem)
    .get('/:id', metadataKeyController.getItemById)
    .delete('/:id', metadataKeyController.deleteItemById)
    .patch('/:id', metadataKeyController.updateItemById);

  done();
};

module.exports = setMetadataKeyRoutes;
