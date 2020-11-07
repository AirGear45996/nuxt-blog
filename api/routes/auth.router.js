const { Router } = require('express');
const router = Router();
const { login, createUser } = require('../controllers/auth.controller');
const passport = require('passport');

// baseUrl: /api/auth

router.post( '/login', login );
//router.post( '/createUser', passport.authenticate('jwt',{session: false}), createUser );
router.post( '/createUser', passport.authenticate('jwt',{session: false}), createUser );

module.exports = router;