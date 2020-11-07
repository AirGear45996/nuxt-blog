const { Strategy, ExtractJwt } = require('passport-jwt');
//const { model } = require('mongoose');
const config = require('../config');
//const User = model('users');

const User = require('../models/user.model');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT
};

module.exports = new Strategy(options, async (payload, done) => {
    // payload - backend/controllers/auth.controller.js::14 -> jwt.sign({...});
    try {
        const candidate = await User.findById(payload.userId).select('id');
        if(candidate) {
            done(null,candidate);
        } else {
            done(null,false); // запрещаем авторизацию для роута
        }
    } catch (e) {
        console.error(e);
        throw e;
    }
});