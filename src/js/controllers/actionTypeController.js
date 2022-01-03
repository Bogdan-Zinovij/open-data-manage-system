'use strict';

const ActionType = require('../db/models/ActionType');
const RoutesController = require('../utils/routesController');

const ActionTypeController = new RoutesController(ActionType);

module.exports = ActionTypeController;
