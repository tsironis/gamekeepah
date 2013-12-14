var express = require('express');
var app = express();
var port = process.env.PORT || 1337;
app.get('/hello.txt', function(req, res){
  res.send('Hello World');
});

app.listen(port);
console.log('Listening on port '+port);
