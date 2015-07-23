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
      dataString = dataString + chunk;
    });

    req.on('end', function(){
      dataString = JSON.parse(dataString);
      dataString = dataString['url'];
      console.log(dataString + "dataString in POST request");
      console.log("received request " + req.method);
      // post should save submitted url's in archives/sites.txt
      archive.addUrlToList(dataString);
      res.end(dataString);
    })
  },
  "GET": function(req, res){
    if (req.url === "/"){
      helpers.serveAssets(res, "/index.html", archive.paths['siteAssets']);
    }else if(archive.isUrlArchived(archive.paths.archivedSites + req.url)){
      console.log("we found " + archive.paths.archivedSites + "!");
      // helpers.serveassets(res, "/")

      //here, we must check archive for file that is req.url
      //if true, return the content of that file
    }else{
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
  } else {

  }
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
