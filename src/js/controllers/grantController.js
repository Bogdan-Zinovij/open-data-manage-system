'use strict';

const Grant = require('../db/models/Grant');
const RoutesController = require('../utils/routesController');

const GrantController = new RoutesController(Grant);

module.exports = GrantController;
