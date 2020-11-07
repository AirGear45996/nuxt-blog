const express   = require('express');
const app       = express();
const mongoose  = require('mongoose');

//region req.body -> json
const bodyParser       = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//endregion

//region кросс доменные запросы
const cors = require('cors');
app.use(cors());
//endregion

//region passport
const passport         = require('passport');
const passportStrategy = require('./middleware/passport.strategy');
app.use(passport.initialize());
passport.use(passportStrategy);
//endregion

//region routes
app.use('/'     , require('./routes/index.router')    );
app.use('/api/auth'     , require('./routes/auth.router')    );
app.use('/api/post'     , require('./routes/post.router')    );
app.use('/api/comment'  , require('./routes/comment.router') );
//endregion

const config = require('./config');
const port = 8000; //process.env.PORT || 8000;
async function start() {
    try {
        await mongoose.connect(config.mongodb_url, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }).then(() => console.log('MongoDB connected...'))
            .catch((e) => console.log('e',e));

        app.listen(port, () => {
            console.log('Server has been started, port' + port);
        });
    } catch (e) {
        console.log('e: ', e);
    }
}
start();