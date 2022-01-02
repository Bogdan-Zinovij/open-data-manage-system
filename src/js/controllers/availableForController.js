'use strict';

const AvailableFor = require('../db/models/MetaDataType');
const RoutesController = require('../utils/routesController');
const AvailableForController = new RoutesController(AvailableFor);
module.exports = AvailableForController;
