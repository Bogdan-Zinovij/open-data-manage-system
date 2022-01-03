'use strict';

const metadataKeyController = require('../controllers/metadataKeyController');
const createRoutersFunction = require('../utils/createRoutersFunction');

const setMetadataKeyRoutes = createRoutersFunction(metadataKeyController);

module.exports = setMetadataKeyRoutes;
