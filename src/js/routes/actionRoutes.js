'use strict';

const actionController = require('../controllers/actionController');
const createRoutersFunction = require('../utils/createRoutersFunction');

const setActionRoutes = createRoutersFunction(actionController);

module.exports = setActionRoutes;
