var fs  = require('fs')
var osmFeed = require('./lib/osm')

var bbox = fs.readFileSync('./bbox.config','utf8')
var url = 'http://zverik.osm.rambler.ru/whodidit/scripts/rss.php?bbox=' + bbox
var num_results = 10

osmFeed.titles(url,num_results)