const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const session = require('express-session')
const {Users,db_url,createUser} = require('./database');



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use(express.static("client"))

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    secret:"foo",
    store: MongoStore.create({
        mongoUrl:db_url
    })
}))

app.get('/', (req, res) => {
    console.log(req);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname,"client","public","index.html"));
})


app.post('/login', (req, res) => {
    console.log(req);
    const username = req.body.username;
    const password = req.body.password;
    Users.findOne({ username: username, password: password},(err, user) => {
        if (user) {
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 200;
            res.end("<h1>Welcome!</h1> Back to home -> <a href=\"/\">Home</a>");
        } 
        else {
            console.log(username + "  " + password + "  not found");
            res.redirect('/');
        }
    })
})

app.post('/register',(req,res) => {
    Users.findOne({username:req.body.username},(err,doc) => {
        if (doc) {
            res.redirect('/');
        }
        else {
            const username = req.body.username;
            const password = req.body.password;
            createUser(username, password);
            res.redirect('/');
        }
    })
})

app.listen(3000,"localhost",() => {   
    console.log("server is running");
})