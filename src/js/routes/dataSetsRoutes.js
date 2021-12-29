'use strict';

const dataSetController = require('../controllers/dataSetController');
const dataFileController = require('../controllers/dataFileController');

const setDataSetsRoutes = (fastify, options, done) => {
  fastify
    .get('/', dataSetController.getAllItems)
    .post('/', dataSetController.createNewItem)

    .get('/dataFiles/', dataFileController.getAllDataFiles)

    .get('/:id', dataSetController.getItemById)
    .patch('/:id', dataSetController.updateItemById)
    .delete('/:id', dataSetController.deleteItemById)

    .get('/:id/dataFiles/', dataFileController.getAllDataFilesInDataSet)
    .post('/:id/dataFiles/', dataFileController.createDataFile)

    .get('/:id/dataFiles/:fileId', dataFileController.getDataFile)
    .patch('/:id/dataFiles/:fileId', dataFileController.updateDataFile)
    .delete('/:id/dataFiles/:fileId', dataFileController.deleteDataFile);

  done();
};

module.exports = setDataSetsRoutes;
