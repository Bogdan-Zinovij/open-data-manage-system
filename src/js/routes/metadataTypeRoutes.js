'use strict';

const metadataTypeController = require('../controllers/metadataTypeController');

const setMetadataTypeRoutes = (fastify, options, done) => {
  fastify
    .get('/', metadataTypeController.getAllItems)
    .post('/', metadataTypeController.createNewItem)

    .get('/:id', metadataTypeController.getItemById)
    .delete('/:id', metadataTypeController.deleteItemById)
    .patch('/:id', metadataTypeController.updateItemById);

  done();
};

module.exports = setMetadataTypeRoutes;
