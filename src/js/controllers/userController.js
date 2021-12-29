'use strict';

const User = require('../db/models/User');
const RoutesController = require('../utils/routesController');
const userController = new RoutesController(User);
module.exports = userController;
