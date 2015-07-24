// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var archive = require("../helpers/archive-helpers.js");
var fs = require('fs');

//cron should intermittently call archive.downloadUrls using
//the elements found in sites.txt passed in as an array.

//cron
archive.downloadUrls(archive.readListOfUrls(function(urls){
  return urls;
}));

fs.writeFile(__dirname + "/logs.txt", "hello", function(err, stuff){
  if (err){throw err};
  console.log(stuff + "was written to our log");
})

/* end cron */