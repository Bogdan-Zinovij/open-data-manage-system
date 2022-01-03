'use strict';

// eslint-disable-next-line max-len
const availableActionController = require('../controllers/availableActionController');
const createRoutersFunction = require('../utils/createRoutersFunction');

const setAvailableActionRoutes = createRoutersFunction(
  availableActionController
);

module.exports = setAvailableActionRoutes;
