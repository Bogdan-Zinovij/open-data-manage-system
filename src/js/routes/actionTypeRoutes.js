'use strict';

const actionTypeController = require('../controllers/actionTypeController');
const createRoutersFunction = require('../utils/createRoutersFunction');

const setActionTypeRoutes = createRoutersFunction(actionTypeController);

module.exports = setActionTypeRoutes;
