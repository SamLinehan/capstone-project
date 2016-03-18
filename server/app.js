require('dotenv').config();
var Express = require('express');
var cors = require('cors');
var Socket = require('socket.io');
var http = require('http');

var db = require('monk')(process.env.MONGOLAB_URI || "localhost:27017/capstone")
var events = db.get('events')

var app = Express();
var server = http.Server(app);

app.get('/api/events', function(request, response){
  var collection = db.get('events');
  collection.find({}, {}, function(error, docs){
      response.json(docs);
  });
})

app.get('/api/venue', function(request, response){
  var collection = db.get('events');
  collection.find({}, {}, function(error, docs){
    response.json(docs);
  })
})


server.listen(process.env.PORT || 3000, function(){
  console.log('listening on port 3000')
})
