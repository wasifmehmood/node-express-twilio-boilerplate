const { validationResult } = require('express-validator/check');
const { sendFailureResponse } = require('..//utils/response');

exports.validationResults = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((e) => e.msg);
    return sendFailureResponse(response, 422, {}, messages, 'Unprocessable_Entity', errors);
  }
  next();
};