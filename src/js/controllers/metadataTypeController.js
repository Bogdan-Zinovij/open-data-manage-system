'use strict';

const MetaDataType = require('../db/models/MetaDataType');
const RoutesController = require('../utils/routesController');

const MetaDataTypeController = new RoutesController(MetaDataType);

module.exports = MetaDataTypeController;
