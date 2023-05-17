"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./ctrl'); // controller 분리

// GET Methods
router.get('/', ctrl.uploadFile);
// router.get('/analyze', ctrl.analyze);
// router.get('/upload', ctrl.home);
// router.get('/aa', ctrl.ex);

// Post Methods
router.post('/', ctrl.uploadFile);


module.exports = router;