'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  DynamicModule = mongoose.model('DynamicModule'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an article
 */
exports.create = function (req, res){


  console.log('--------create---------');
  console.log(req.body);

  var dynamicModule = new DynamicModule(req.body);
  dynamicModule.user = req.user;

  dynamicModule.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(dynamicModule);
    }
  });


};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var dynamicModule = req.dynamicModule ? req.dynamicModule.toJSON() : {};

  // Add a custom field to the DynamicModule, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the DynamicModule model.
  //article.isCurrentUserOwner = req.user && article.user && article.user._id.toString() === req.user._id.toString() ? true : false;

  res.json(dynamicModule);
};

/**
 * Update an dynamicModule
 */
exports.update = function (req, res) {
  var dynamicModule = req.dynamicModule;

  console.log('------dynamicModuleDATE-------');
  console.log(dynamicModule.toJSON());

  dynamicModule.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(dynamicModule);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  var article = req.article;

  article.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
  DynamicModule.find().sort('-created').populate('user', 'displayName').exec(function (err, articles) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(articles);
    }
  });
};




/**
 * Article middleware
 */
exports.populateDynamicModuleById = function (req, res, next, id) {

  console.log('--------populateDynamicModuleById---------');

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Dynamic Module Id is invalid'
    });
  }

  DynamicModule.findById(id).populate('user', 'displayName').exec(function (err, dynamicModule) {

    //console.log(dynamicModule);

    if (err) {
      return next(err);
    } else if (!dynamicModule) {
      return res.status(404).send({
        message: 'No DynamicModule with that id has been found'
      });
    }
    req.dynamicModule = dynamicModule;
    next();
  });
};
