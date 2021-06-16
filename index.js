const express = require('express');
const path = require("path");
const passport = require('passport');
const MongoStore = require('connect-mongo');
const session = require('express-session')
const {db_url} = require('./database');
const router = require('./routes/routes');

const app = express();

require('./authenticate');
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(express.static("client"))

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret:"foo",
    store: MongoStore.create({
        mongoUrl:db_url
    }),
    cookie: {
        maxAge: 1000 * 24 * 60 * 60
    }
}))

app.use(passport.initialize());
app.use(passport.session());



app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
})

app.use(router);

app.listen(3000,"localhost",() => {   
    console.log("server is running");
})