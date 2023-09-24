const express = require('express');
const userRoutes = require('./user.route.js');
const { sendFailureResponse } = require('../utils/response');

const router = express.Router();

router.use('/users', userRoutes);

router.use('*', (req, res) => sendFailureResponse(res, 404, {}, [], 404, { code: 404, message: 'Route does not exist.' }));

module.exports = router;
