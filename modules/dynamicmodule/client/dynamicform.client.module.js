(function (app) {
  'use strict';

  app.registerModule('dynamicmodule');
  app.registerModule('dynamicmodule.services');
  app.registerModule('dynamicmodule.routes', ['ui.router']);

})(ApplicationConfiguration);
