'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
    mongoose = require('mongoose'),
    DynamicModuleData = mongoose.model('DynamicModuleData'),
    DynamicModule = mongoose.model('DynamicModule'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an dynamicModule
 */
exports.create = function (req, res) {


    console.log('--------create---------');
    console.log(req.params);

    var dynamicModuleData = new DynamicModuleData(req.body);
    dynamicModuleData.dynamicModule = req.params.dynamicModuleId;
    dynamicModuleData.user = req.user;

    dynamicModuleData.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(dynamicModuleData);
        }
    });


};

/**
 * Show the current dynamicModuleData
 */
exports.read = function (req, res) {
    // convert mongoose document to JSON
    var dynamicModuleData = req.dynamicModuleData ? req.dynamicModuleData.toJSON() : {};


    // convert mongoose document to JSON
    var dynamicModule = req.dynamicModule ? req.dynamicModule.toJSON() : {};


    res.json({dynamicModule:dynamicModule, dynamicModuleData:dynamicModuleData});
};

/**
 * Update an dynamicModuleData
 */
exports.update = function (req, res) {
    var dynamicModuleData = req.dynamicModuleData;

    dynamicModuleData.dynamicModule = req.params.dynamicModuleId;
    dynamicModuleData.formData = req.body.formData;


    console.log('------dynamicModuleDATE-------');
    console.log(dynamicModuleData.toJSON());

    dynamicModuleData.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(dynamicModuleData);
        }
    });
};

/**
 * Delete an dynamicModuleData
 */
exports.delete = function (req, res) {
    var dynamicModuleData = req.dynamicModuleData;

    dynamicModuleData.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(dynamicModuleData);
        }
    });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {

    console.log("dynamicModuleId :: " + req.params.dynamicModuleId);

    var dynamicModuleAndDynamicModuleData = {};


    DynamicModuleData.find({dynamicModule: req.params.dynamicModuleId}).sort('-created').populate('user', 'displayName').exec(function (err, dynamicModuleDatas) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {

            dynamicModuleAndDynamicModuleData.dynamicModuleDatas = dynamicModuleDatas;

            // convert mongoose document to JSON
            var dynamicModule = req.dynamicModule ? req.dynamicModule.toJSON() : {};
            dynamicModuleAndDynamicModuleData.dynamicModule = dynamicModule;


            res.json(dynamicModuleAndDynamicModuleData);

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


/**
 * Article middleware
 */
exports.populateDynamicModuleDataById = function (req, res, next, id) {

    console.log('--------populateDynamicModuleDataById---------');

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Dynamic Module Id is invalid'
        });
    }

    DynamicModuleData.findById(id).populate('dynamicModule').populate('user', 'displayName').exec(function (err, dynamicModuleData) {

        //console.log(dynamicModuleData);

        if (err) {
            return next(err);
        } else if (!dynamicModuleData) {
            return res.status(404).send({
                message: 'No DynamicModuleData with that id has been found'
            });
        }
        req.dynamicModuleData = dynamicModuleData;
        next();
    });


};

