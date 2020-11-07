const { Router } = require('express');
const router = Router();
const { create } = require('../controllers/comment.controller');

// /api/comment
router.post( '/create', create );

module.exports = router;