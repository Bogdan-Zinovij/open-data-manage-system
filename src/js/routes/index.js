'use strict';

const metadataTypeRouter = require('./metadataTypeRoutes');
const categoriesRouter = require('./categoriesRoutes');
const dataSetsRouter = require('./dataSetsRoutes');
const metadataKeyRouter = require('./metadataKeyRoutes');
const metadataValueRouter = require('./metadataValueRoutes');
const typeRouter = require('./typeRoutes');
const stateRouter = require('./stateRoutes');
const actionTypeRouter = require('./actionTypeRoutes');
const roleRouter = require('./roleRoutes');
const userRouter = require('./userRoutes');
const actionRouter = require('./actionRoutes');
const availableActionRouter = require('./availableActionRoutes');
const grantRouter = require('./grantRoutes');

module.exports = {
  metadataTypeRouter,
  categoriesRouter,
  dataSetsRouter,
  metadataKeyRouter,
  metadataValueRouter,
  typeRouter,
  stateRouter,
  actionTypeRouter,
  roleRouter,
  userRouter,
  actionRouter,
  availableActionRouter,
  grantRouter,
};
