'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var DynamicModuleDataSchema = new Schema({
  dynamicModule: {
    type: Schema.ObjectId,
    ref: 'DynamicModule'
  },
  formData: {},
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('DynamicModuleData', DynamicModuleDataSchema);
