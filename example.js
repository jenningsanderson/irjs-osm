var fs  = require('fs')

var bbox = fs.readFileSync('./bbox.config','utf8')
url = 'http://zverik.osm.rambler.ru/whodidit/scripts/rss.php?bbox=' + bbox

var osmFeed = require('./lib/test')
var feed = osmFeed(url)

feed.titles()