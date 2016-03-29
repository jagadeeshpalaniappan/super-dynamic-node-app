(function (app) {
  'use strict';

  app.registerModule('dynamicmoduledata');
  app.registerModule('dynamicmoduledata.services');
  app.registerModule('dynamicmoduledata.routes', ['ui.router']);

})(ApplicationConfiguration);
