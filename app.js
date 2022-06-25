require('dotenv').config();

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const app = express();
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const dataRouter = require('./routes/data');
const MongoDBStore = require('connect-mongodb-session')(session);
const compression = require('compression');
app.use(compression());

const urlConnect = process.env.DB;

// Connect to database
mongoose.connect(urlConnect, err => {
    if (err) 
        throw err;
    


    console.log('Connect successfullyy!!');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(flash());
app.use(session({
    secret: 'notsecret',
    saveUninitialized: true,
    resave: false,
    store: new MongoDBStore(
        {uri: process.env.DB, collection: 'sessions'}
    ),
    cookie: {
        maxAge: 180 * 60 * 1000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// pass passport for configuration
require('./config/passport')(passport);

app.use(authRouter);
app.use(userRouter);
app.use(dataRouter);

let server = app.listen(process.env.PORT || 3000)

module.exports = app;
