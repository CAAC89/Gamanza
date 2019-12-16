var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


var api=require('./routes/api');
app.use('/api',api);

//Default
 
app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  res.end();
});
 
app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
  });
  console.log('socket', req.testing);
});

//--

app.listen(8080);

module.exports = app;