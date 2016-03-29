'use strict';

/**
 * Module dependencies
 */
var articlesPolicy = require('../policies/dynamicmodule.server.policy'),
    dynamicmodules = require('../controllers/dynamicmodule.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/dynamicmodules')
    .get(dynamicmodules.list)
    .post(dynamicmodules.create);

  // Single article routes
  app.route('/api/dynamicmodules/:dynamicModuleId')
    .get(dynamicmodules.read)
    .put(dynamicmodules.update)
    .delete(dynamicmodules.delete);

  // Finish by binding the article middleware
  app.param('dynamicModuleId', dynamicmodules.populateDynamicModuleById);


};
