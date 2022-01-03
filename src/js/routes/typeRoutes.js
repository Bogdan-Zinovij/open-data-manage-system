'use strict';

const typeController = require('../controllers/typeController');
const setBasicRoutes = require('../utils/setBasicRoutes');

const setTypeRoutes = setBasicRoutes(typeController);

module.exports = setTypeRoutes;
