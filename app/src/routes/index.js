"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./ctrl'); // controller 분리
// var path = require('path');
// router.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));

// GET Methods
router.get('/', ctrl.uploadFile);
router.get('/:type/:num', ctrl.spread_data);

// Post Methods
router.post('/', ctrl.uploadFile);

module.exports = router;