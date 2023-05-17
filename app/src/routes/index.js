"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./ctrl'); // controller 분리

// GET Methods
router.get('/', ctrl.home);
router.get('/analyze', ctrl.analyze);
router.get('/upload', ctrl.uploadFile);

// Post Methods
router.post('/upload', ctrl.uploadFile);


module.exports = router;