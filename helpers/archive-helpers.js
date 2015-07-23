var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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

  // var listOfUrlsArray = exports.readListOfUrls().split("\n");
  // if (listOfUrlsArray.indexOf(target) !== -1){
  //   console.log("the URL is in the list");
  //   return true;
  // }
  // return false;
};

exports.addUrlToList = function(data, callback){
  ///Users/student/2015-06-web-historian/helpers../web/archives/sites/someurl.com'
  if (!exports.isUrlInList(data)){
    fs.appendFile(exports.paths.list, (data + '\n'), function(err){
      if (err) throw err;
      console.log("URL has been added to list");
    });
  }
  var newDir = __dirname + "/../web/archives/sites/" + data;
  console.log(newDir + " is the directory we want to write...");
  if(!exports.isUrlArchived(newDir)){
    exports.downloadUrls(newDir);
  }
};

exports.isUrlArchived = function(dir){
  if (!fs.existsSync(dir)){
    // fs.writeFileSync(dir);
    return false; //should this even create the file, or should that be handled by downloadUrls?
  }
  return true;
};

exports.downloadUrls = function(dir){
  fs.writeFileSync(dir);
};
