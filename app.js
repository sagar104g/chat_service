var express = require('express');  
var app = express();
const Sentry = require('@sentry/node');
var server = require('http').createServer(app);
var config = require('./config/config')
var mongoConnection = require('./services/mongo')

Sentry.init({ dsn: config.SENTRY_DSN });
app.use(Sentry.Handlers.requestHandler());
app.use(express.static(__dirname + '/node_modules'));  

app.get('/status',function(req,res){
    res.status(200).send({status:'ok'});
});

app.use(Sentry.Handlers.errorHandler());
app.use(function onError(err, req, res, next) {
  res.end(res.sentry + "\n");
  console.log("Error Handled Via Sentry: "+res.sentry)
  next();
});

Promise.all(mongoConnection.mongoPromise).then( function(){
var httpServer = server.listen(5000, function () {
    console.info("Server is running on 5000 port");
  });
var io = require('socket.io')(httpServer, { path: '/'});
var room = require('./models/socket')(io);
}).catch(function(err){
  console.log(err)
})