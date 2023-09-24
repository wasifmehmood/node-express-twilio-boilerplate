const { body, query, param } = require('express-validator');

exports.createUser = [
  body('name', 'name missing').exists().notEmpty(),
  body('phone_number', 'phoneNumber missing').exists().notEmpty(),
];

exports.generateOTP = [
  body('phone_number', 'phoneNumber missing').exists().notEmpty(),
];

exports.verifyOTP = [
  param('user_id').isInt().withMessage('user_id is invalid or empty'),
  query('otp').exists().withMessage('otp is missing')
    .isLength({ min: 4, max: 4 })
    .withMessage('otp is invalid'),
];
