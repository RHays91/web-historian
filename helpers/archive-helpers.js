var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('http-request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = { //__dirname is the working directory this file resides in.
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){ //does this have a test associated with it? if so, what does it want???
  fs.readFile(exports.paths.list, {encoding: 'utf8'}, function(err, data){
    // completeData = JSON.parse(data);
    if (err){throw err};
    console.log(data + "is our read data");
    console.log(typeof data);
    callback(data.split('\n'));
  });

  // console.log(listOfUrls + "is our list of Urls...")
};

exports.isUrlInList = function(target, callback){
  exports.readListOfUrls(function(data){
    callback(data.indexOf(target) > -1)
  });
};

exports.addUrlToList = function(data, callback){
  exports.isUrlInList(data, function(is){
    if (!is){
      fs.appendFile(exports.paths.list, (data + '\n'), function(err){
        if (err) {throw err};
        callback();
      });
    }
  });
};

exports.isUrlArchived = function(target, callback){
  fs.exists(exports.paths.archivedSites + "/" + target, function(is){
    callback(is);
  });
};

exports.downloadUrls = function(data){
  _.each(data, function(site){
      exports.isUrlArchived(site, function(is){
      if (!is){
        fs.writeFile(exports.paths.archivedSites + "/" + site, request.get(site, function(err, res){
          return res.code;
        }),
        function(err, stuff){
          //finish the error handling callback
          if (err) {throw err};
          console.log(site + "was written");
        });
      }
    });
  });
};

















