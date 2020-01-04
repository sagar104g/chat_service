var express = require('express');  
var app = express();
const Sentry = require('@sentry/node');
var io = require('./services/socket');
var room = require('./models/socket')(io);
var config = require('./config/config')

Sentry.init({ dsn: config.SENTRY_DSN });
app.use(Sentry.Handlers.requestHandler());
app.use(express.static(__dirname + '/node_modules'));  

app.get('/',function(req,res){
    res.status(200).send({status:'ok'});
});

app.use(Sentry.Handlers.errorHandler());
app.use(function onError(err, req, res, next) {
  res.end(res.sentry + "\n");
  console.log("Error Handled Via Sentry: "+res.sentry)
  next();
});

app.listen(5000, function () {
    console.info("Server is running on 5000 port");
  });