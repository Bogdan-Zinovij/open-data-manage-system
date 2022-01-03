'use strict';

const AvailableAction = require('../db/models/AvailableAction');
const RoutesController = require('../utils/routesController');

const AvailableActionController = new RoutesController(AvailableAction);

module.exports = AvailableActionController;
