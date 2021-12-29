'use strict';

const Role = require('../db/models/Role');
const RoutesController = require('../utils/routesController');
const RoleController = new RoutesController(Role);

module.exports = RoleController;
