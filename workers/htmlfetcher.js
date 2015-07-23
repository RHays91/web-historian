// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var archive = require("../helpers/archive-helpers.js");

//cron should intermittently call archive.downloadUrls using
//the elements found in sites.txt passed in as an array.

//cron
archive.downloadUrls(archive.readListOfUrls(function(urls){
  return urls;
}));

/* end cron */