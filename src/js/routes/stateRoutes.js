'use strict';

const stateController = require('../controllers/stateController');
const setBasicRoutes = require('../utils/setBasicRoutes');

const setStateRoutes = setBasicRoutes(stateController);

module.exports = setStateRoutes;
