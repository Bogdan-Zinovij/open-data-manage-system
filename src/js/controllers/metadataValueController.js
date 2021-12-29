'use strict';

const MetaDataValue = require('../db/models/MetaDataValue');
const RoutesController = require('../utils/routesController');

const dataValueController = new RoutesController(MetaDataValue);
module.exports = dataValueController;
