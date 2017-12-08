var express = require('express');
var router = express.Router();
var request = require('request');


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
