const { Router } = require('express');
const router = Router();
const passport = require('passport');
const ctr = require('../controllers/post.controller');
const upload = require('../middleware/upload');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// /api/post

// Admin - защищены паспортом
router.post(
    '/admin/',
    passport.authenticate('jwt', {session: false}),
    upload.single('image'), // store/post.js::57 -> formData.append('image',data.image,data.image.name);
    ctr.create
);
router.get( '/admin/', passport.authenticate('jwt',{session: false}), ctr.getAll );
router.get( '/admin/:id', passport.authenticate('jwt',{session: false}), ctr.getById );
router.put( '/admin/:id', passport.authenticate('jwt',{session: false}), ctr.update );
router.delete( '/admin/:id', passport.authenticate('jwt',{session: false}), ctr.delete );
router.get( '/analytics', passport.authenticate('jwt',{session: false}), ctr.getAnalytics );

// Base - публичка
router.get( '/', ctr.getAll );
router.get( '/:id', ctr.getById );
router.put( '/:id', ctr.addView );

module.exports = router;