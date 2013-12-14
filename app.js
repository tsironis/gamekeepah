var express = require('express');
var _ = require('underscore');
var app = express();
// inside if statement
var redis   = require("redis-url").connect(process.env.REDISTOGO_URL);
var port = process.env.PORT || 5000;

var logfmt = require("logfmt");

app.use(express.bodyParser());
app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.post('/api/:errorHash', function(req, res){
  res.send('ok')
  _.each(req.body, function (value, key) {
    console.log(key+': '+value);
    redis.hset(req.params.errorHash, key, value, redis.print);
  });
});

app.get('/api/:errorHash', function(req, res){
  redis.hgetall(req.params.errorHash, function (err, replies) {
    console.log(replies);
    res.end(JSON.stringify(replies));
  });
});

app.listen(port);
console.log('Listening on port '+port);
