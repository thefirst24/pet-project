const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../passwordUtils').genPassword;
const {User} = require('../database');
const path = require('path')

router.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname,"..","client","public","index.html"));
})

router.get('/login-fail',(req, res) => {
    res.send("fail");
})

router.post('/login',passport.authenticate('local',{failureRedirect:'/login-fail',successRedirect:'/'}), (req, res) => {
    res.redirect('/');
})

router.post('/register',(req,res) => {

    const hashSalt = genPassword(req.body.password);

    const newUser = new User({
        username:req.body.username,
        hash:hashSalt.hash,
        salt:hashSalt.salt
    })

    newUser.save()
    .then((user) => {
        console.log(user);
    })

    res.redirect(307,'/login');  
})

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;