'use strict';

const roleController = require('../controllers/roleController');
const createRoutersFunction = require('../utils/createRoutersFunction');

const setRoleRoutes = createRoutersFunction(roleController);

module.exports = setRoleRoutes;
