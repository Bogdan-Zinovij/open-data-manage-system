'use strict';

const State = require('../db/models/State');
const RoutesController = require('../utils/routesController');
const stateController = new RoutesController(State);
module.exports = stateController;
