'use strict';

const metadataTypeController = require('../controllers/metadataTypeController');
const createRoutersFunction = require('../utils/createRoutersFunction');

const setMetadataTypeRoutes = createRoutersFunction(metadataTypeController);

module.exports = setMetadataTypeRoutes;
