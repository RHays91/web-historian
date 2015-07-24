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
    res.writeHead(302, defaultCorsHeaders);

    var dataString = "";

    req.on('data', function(chunk){
      dataString += chunk;
    });

    req.on('end', function(){
      //TODO:
      //redirect to loading screen; serve asset upon completion
      dataString = JSON.parse(dataString);
      dataString = dataString['url'];
      // post should save submitted url's in archives/sites.txt
      archive.addUrlToList(dataString, function(){
        res.end();
      });
    });
  },
  "GET": function(req, res){
    var fileName = req.url.substring(1);
    if (req.url === "/"){
      helpers.serveAssets(res, "/index.html", archive.paths['siteAssets']);
    }else {
      archive.isUrlArchived(fileName, function(is){
        if (is) {
        helpers.serveAssets(res, req.url, archive.paths['archivedSites']);
        } else {
          headers['Content-Type'] = "text/plain";
          res.writeHead(404, headers);
          res.end();
        }
      });
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
