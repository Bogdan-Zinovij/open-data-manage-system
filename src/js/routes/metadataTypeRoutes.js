'use strict';

const metadataTypeController = require('../controllers/metadataTypeController');
const setBasicRoutes = require('../utils/setBasicRoutes');

const setMetadataTypeRoutes = setBasicRoutes(metadataTypeController);

module.exports = setMetadataTypeRoutes;
