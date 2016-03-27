'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var DynamicModuleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  moduleName: {
    type: String,
    default: '',
    trim: true,
    required: 'Module Name cannot be blank'
  },
  formFieldsFormly: [],
  formFieldsFbBuilder: [],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('DynamicModule', DynamicModuleSchema);
