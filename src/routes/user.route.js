const express = require('express');

const router = express.Router();
const { createUser, generateOTP, verifyOTP } = require('../controllers/users/index.js');
const validator = require('../controllers/users/validations');
const { validationResults } = require('../middlewares/validationResult');

router.post('/', validator.createUser, validationResults, createUser);

router.post('/generateOTP', validator.generateOTP, validationResults, generateOTP);

router.get('/:user_id/verifyOTP', validator.verifyOTP, validationResults, verifyOTP);

module.exports = router;