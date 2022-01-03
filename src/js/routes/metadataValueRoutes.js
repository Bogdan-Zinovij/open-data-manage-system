'use strict';

const dataValueController = require('../controllers/metadataValueController');
const setBasicRoutes = require('../utils/setBasicRoutes');

const setDataValuesRoutes = setBasicRoutes(dataValueController);

module.exports = setDataValuesRoutes;
