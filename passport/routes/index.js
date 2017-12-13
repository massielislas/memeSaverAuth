var express = require('express');
var router = express.Router();
var request = require('request');
var expressSession = require('express-session');

var users = require('../controllers/users_controller');
console.log("before / Route");
router.get('/', function(req, res){
    console.log("/ Route");
//    console.log(req);
    console.log(req.session);
    if (req.session.user) {
      console.log("/ Route if user");
      res.render('index', {username: req.session.username,
                           msg:req.session.msg,
                           color:req.session.color});
    } else {
      console.log("/ Route else user");
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});
router.get('/user', function(req, res){
    console.log("/user Route");
    if (req.session.user) {
      res.render('user', {msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});
router.get('/signup', function(req, res){
    console.log("/signup Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('signup', {msg:req.session.msg});
});
router.get('/login',  function(req, res){
    console.log("/login Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('login', {msg:req.session.msg});
});
router.get('/logout', function(req, res){
    console.log("/logout Route");
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });
router.post('/signup', users.signup);
router.post('/user/update', users.updateUser);
router.post('/user/delete', users.deleteUser);
router.post('/login', users.login);
router.get('/user/profile', users.getUserProfile);

var memes = [
  {
    id: 0,
    name: 'Me on a daily basis',
    avatarUrl: 'http://s2.quickmeme.com/img/6a/6a537a8428c28804ad9f638aaea421564d03ca9c83dbded3e484da57fc5353ec.jpg',
    likes:5
  },
  {
    id: 1,
    name: 'What 240 Server?',
    avatarUrl: 'http://s2.quickmeme.com/img/28/28cc8dd1eb24d384bae43ccc4040d6a3906e1828986725eaeaa2032d9c611210.jpg',
    likes:2
  }
];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { title: 'public' });
});

router.get('/memes', function(req, res) {
  console.log("In memes");
  res.send(memes);
});

router.post('/memes', function(req, res) {
    console.log("In memes Post");
    console.log(req.body);
    memes.push(req.body);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

router.post('/memesUp', function(req, res) {
    console.log("In memesUp Post");
    console.log(req.body);
    memes[req.body.id].likes += 1;
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});


module.exports = router;
