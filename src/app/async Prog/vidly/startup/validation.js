const Joi = require("joi");

module.exports = function() {
  Joi.objectId = require("joi-objectid")(Joi); // working with objectID
  // we use to validate input tou our API
};
