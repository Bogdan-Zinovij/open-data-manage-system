'use strict';

const dataValueController = require('../controllers/metadataValueController');
const setDataValuesRoutes = (fastify, options, done) => {
  fastify
    .get('/', dataValueController.getAllItems)
    .post('/', dataValueController.createNewItem)

    .get('/:id', dataValueController.getItemById)
    .patch('/:id', dataValueController.updateItemById)
    .delete('/:id', dataValueController.deleteItemById);

  done();
};

module.exports = setDataValuesRoutes;
