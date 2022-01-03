'use strict';

const MetadataKey = require('../db/models/MetaDataKey');
const RoutesController = require('../utils/routesController');

const MetadataKeyController = new RoutesController(MetadataKey);

module.exports = MetadataKeyController;
