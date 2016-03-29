'use strict';

/**
 * Module dependencies
 */
var articlesPolicy = require('../policies/dynamicmodulesdata.server.policy'),
    dynamicmodulesdata = require('../controllers/dynamicmodulesdata.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/dynamicmodulesdata/:dynamicModuleId')
    .get(dynamicmodulesdata.list)
    .post(dynamicmodulesdata.create);

  // Single article routes
  app.route('/api/dynamicmodulesdata/:dynamicModuleId/:dynamicModuleDataId')
    .get(dynamicmodulesdata.read)
    .put(dynamicmodulesdata.update)
    .delete(dynamicmodulesdata.delete);

  // Finish by binding the article middleware
  app.param('dynamicModuleId', dynamicmodulesdata.populateDynamicModuleById);
  app.param('dynamicModuleDataId', dynamicmodulesdata.populateDynamicModuleDataById);


};
