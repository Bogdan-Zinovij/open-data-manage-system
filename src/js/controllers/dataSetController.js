'use strict';

const DataSet = require('../db/models/DataSet');
const RoutesController = require('../utils/routesController');

const dataSetController = new RoutesController(DataSet);
module.exports = dataSetController;
