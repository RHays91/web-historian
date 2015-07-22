var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
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
      var site = process.cwd() + "/public/index.html";
      console.log(site);
      fs.readFile(site, function(err, data){
        if (err){
          console.log("we fucked up again");
        } else {
          headers['Content-Type'] = "text/html";
          res.writeHead(200, headers);
          res.write(data);
          res.end();
        }
      });
    } else {
    // res.write();
      res.writeHead(404, headers);
      res.end('404');
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
