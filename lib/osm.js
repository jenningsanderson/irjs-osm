var rss = require('parserss');
var fs  = require('fs');

var bbox = fs.readFileSync('./bbox.config','utf8')
url = 'http://zverik.osm.rambler.ru/whodidit/scripts/rss.php?bbox=' + bbox

rss(url, 10, function (err, res) {
  console.log(err);
  console.log(res);
});