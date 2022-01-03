'use strict';

const actionController = require('../controllers/actionController');
const setBasicRoutes = require('../utils/setBasicRoutes');

const setActionRoutes = setBasicRoutes(actionController);

module.exports = setActionRoutes;
