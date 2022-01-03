'use strict';

const grantController = require('../controllers/grantController');
const createRoutersFunction = require('../utils/createRoutersFunction');

const setGrantRoutes = createRoutersFunction(grantController);

module.exports = setGrantRoutes;
