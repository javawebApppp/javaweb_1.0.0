"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./ctrl'); // controller 분리

// GET Methods
router.get('/', ctrl.uploadFile);
router.get('/:type/:num', ctrl.spread_data);

// Post Methods
router.post('/', ctrl.uploadFile);

module.exports = router;