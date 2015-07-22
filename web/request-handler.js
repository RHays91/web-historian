var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require('./http-helpers.js');
// require more modules/folders here!

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var headers = defaultCorsHeaders;

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
    if (req.url === "/"){
      helpers.serveAssets(res, "/public/index.html");
    } else {
      headers['Content-Type'] = "text/plain";
      res.writeHead(200, headers);
      res.end(data);
    }
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
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
