var express = require('express');
var redis = require('redis');
var _ = require('underscore');
var app = express();
var redisClient = redis.createClient();
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
    redisClient.hset(req.params.errorHash, key, value, redis.print);
  });
});

app.get('/api/:errorHash', function(req, res){
  redisClient.hgetall(req.params.errorHash, function (err, replies) {
    console.log(replies);
    res.end(JSON.stringify(replies));
  });
});

app.listen(3000);
console.log('Listening on port '+3000);
