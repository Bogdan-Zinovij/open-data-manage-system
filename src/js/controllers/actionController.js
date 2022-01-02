'use strict';

const Action = require('../db/models/Action');
const RoutesController = require('../utils/routesController');
const actionController = new RoutesController(Action);
module.exports = actionController;
