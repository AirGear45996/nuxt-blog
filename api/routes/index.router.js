const { Router } = require('express');
const router = Router();
const { index } = require('../controllers/index.controller');

// baseUrl: /api

router.get( '/', index );

module.exports = router;