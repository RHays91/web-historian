var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  // 'Content-Type': "text/html" //this is a fallback
};

exports.contentTypes = {
  //using the path module, we can get the suffix for each file we serve...
  //
  ".css": "text/css",
  ".html": "text/html",
  ".js": "application/javascript",
  ".png": "image/png",
  ".gif": "image/gif",
  ".jpg": "image/jpg"
};

exports.serveAssets = function(res, asset, pathname) { //res, asset, callback
  var site = pathname + asset;
  fs.readFile(site, function(err, data){
    if (err){
      console.log("something went wrong");
    }
    headers['Content-Type'] = exports.contentTypes[path.extname(asset)];
    res.writeHead(200, headers);
    res.write(data);
    res.end();
  });
};

exports.serveArchivedSite = function(res, asset){

}



// As you progress, keep thinking about what helper functions you can put here!
