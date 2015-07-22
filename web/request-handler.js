var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

var actions = {
  "POST": function(req, res){
    res.writeHead(201, defaultCorsHeaders);

    var dataString = "";

    req.on('data', function(chunk){
      dataString = dataString + chunk;
    });


    req.on('end', function(){
      console.log("received request " + req.method);
      res.end(dataString);
    })
  },
  "GET": function(req, res){
    res.writeHead(200, defaultCorsHeaders);
    console.log("received request " + req.method);
    // res.write();
    res.end();
  },
  "OPTIONS": function(req, res){
    res.writeHead(200, defaultCorsHeaders);
    console.log("received request " + req.method);
    res.end();
  }
}

exports.handleRequest = function (req, res) {
  var action = req.method;
  
  if (actions[action]){
    actions[action](req, res);
  }
};

var defaultCorsHeaders = {
  "Content-Type": "text/plain",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
