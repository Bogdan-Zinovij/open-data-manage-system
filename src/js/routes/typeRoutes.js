'use strict';

const typeController = require('../controllers/typeController');
const createRoutersFunction = require('../utils/createRoutersFunction');

const setTypeRoutes = createRoutersFunction(typeController);

module.exports = setTypeRoutes;
