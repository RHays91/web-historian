var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  res.writeHead(201, defaultCorsHeaders);

  var dataString = "";

  req.on('data', function(chunk){
    dataString = dataString + chunk;
  });

  request.on('end', function(){
    res.end(dataString);
  })
};

var defaultCorsHeaders = {
  "Content-Type": "text/plain",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
