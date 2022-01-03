'use strict';

const userController = require('../controllers/userController');
const createRoutersFunction = require('../utils/createRoutersFunction');

const setUserRoutes = createRoutersFunction(userController);

module.exports = setUserRoutes;
