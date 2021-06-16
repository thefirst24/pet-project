const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../passwordUtils').genPassword;
const {User,Post} = require('../database');
const path = require('path');
const isAuth = require('../authMiddleware').isAuth;

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

router.get('/is_logged',(req, res) => {
    const isAuth = req.isAuthenticated();
    res.send(isAuth);
})

router.get('/posts',isAuth,(req, res) => {
    Post.find({author:req.user._id})
    .then(posts => {
        posts = posts.map(post => {return {title:post.title,text:post.text,date:post.date,id:post._id }})
        res.send({err:null,posts});
    })
    .catch(err => {
        console.log(err);
        res.send({err:err})
    });
})

router.post('/delete_post/:id',isAuth,(req,res) => {
    Post.deleteOne({_id:req.params.id},(err) => {
        if (err) console.log(err);
        res.statusCode = 200;
        res.redirect('/');
    });
    
})
    
router.post('/add_post',isAuth,(req, res) => {
    const {title,text} = req.body;
    const newPost = new Post({author:req.user._id,title,text,date:Date.now()})
    newPost.save()
    .then(post => {
        console.log(post);
        res.statusCode = 200;
        res.redirect('/');
    })
    .catch(err => console.log(err));
})

module.exports = router;