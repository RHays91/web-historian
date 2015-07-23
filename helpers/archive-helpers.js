var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var listOfUrls;

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

exports.readListOfUrls = function(){
  fs.readFile(exports.paths.list, function(err, data){
    if (err) throw err;
    // console.log(data.toString());
    listOfUrls = data.toString();
  });
};

exports.isUrlInList = function(target){
  exports.readListOfUrls();
  var listOfUrlsArray = listOfUrls.split("\n");
  if (listOfUrlsArray.indexOf(target) !== -1){
    console.log("the URL is in the list");
    return true;
  }
  return false;
};

exports.addUrlToList = function(data){
  console.log(typeof data + " is our initial typeof data...");
  var data = JSON.parse(data);
  console.log(typeof data + " is our new typeof data...");
  console.log(data);
  console.log("is our 'object'...")
  var url = data['url'];
  fs.appendFile(exports.paths.list, url + '\n', function(err){
    if (err) throw err;
    console.log("URL has been added to list");
  })
};

exports.isUrlArchived = function(){
};

exports.downloadUrls = function(){
};
