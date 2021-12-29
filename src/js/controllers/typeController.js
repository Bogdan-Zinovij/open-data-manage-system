'use strict';

const Type = require('../db/models/Type');
const RoutesController = require('../utils/routesController');
const typeController = new RoutesController(Type);
module.exports = typeController;
