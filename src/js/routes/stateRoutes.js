'use strict';

const stateController = require('../controllers/stateController');
const createRoutersFunction = require('../utils/createRoutersFunction');

const setStateRoutes = createRoutersFunction(stateController);

module.exports = setStateRoutes;
