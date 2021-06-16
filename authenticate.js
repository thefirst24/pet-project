const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport')
const connection = require('./database').connection;
const User = require('./database').User;
const validPassword = require('./passwordUtils').validPassword;

const verifyCallback = (username,password,done) => {
    User.findOne({username: username})
    .then(user => {
        if (!user) return done(null,false);
        const isValid = validPassword(password,user.hash,user.salt);

        if (!isValid) return done(null,false);

        return done(null,user);
    })
    .catch(err => done(err));
}


const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user,done) => {
    done(null,user.id);
})

passport.deserializeUser((userId,done) => {
    User.findById(userId)
    .then(user => {
        done(null,user);
    })
    .catch(err => done(err));
})

