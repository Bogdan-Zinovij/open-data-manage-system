'use strict';

const userController = require('../controllers/userController');
const setBasicRoutes = require('../utils/setBasicRoutes');

const setUserRoutes = setBasicRoutes(userController);

module.exports = setUserRoutes;
