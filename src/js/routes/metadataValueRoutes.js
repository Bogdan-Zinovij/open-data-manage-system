'use strict';

const dataValueController = require('../controllers/metadataValueController');
const createRoutersFunction = require('../utils/createRoutersFunction');

const setDataValuesRoutes = createRoutersFunction(dataValueController);

module.exports = setDataValuesRoutes;
