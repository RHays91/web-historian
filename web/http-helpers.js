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

exports.serveAssets = function(res, asset, callback) { //res, asset, callback
  var site = archive.paths['siteAssets'] + asset;
  fs.readFile(site, function(err, data){
    if (err){
      console.log("something went wrong");
    }
    headers['Content-Type'] = exports.contentTypes[path.extname(asset)];
    console.log(headers['Content-Type']+ " is the content type!!!");
    res.writeHead(200, headers);
    res.write(data);
    // res.write(data);
    res.end();
  });

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};



// As you progress, keep thinking about what helper functions you can put here!
