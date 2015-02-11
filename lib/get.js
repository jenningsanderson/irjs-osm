var fs  = require('fs')
var rss = require('parserss')

var output = require('./output')

// Reads BBOX config file and sets up URL for request function below
var bbox = fs.readFileSync('./bbox.config','utf8')

url = 'http://zverik.osm.rambler.ru/whodidit/scripts/rss.php?bbox=' + bbox

module.exports = function(options, cb) {

  //Parse out options
  var num_results = options.parent.limit
  var outFile     = options.parent.outFile
  var format      = options.parent.format

  // Make Request  
  rss(url, num_results, function (err, res) {
    if (err) { console.log(err) }
    
    // If there is a result, pass it to the desired function
    if (res) { 
    	cb(res.articles, outFile, output[format])
    }
  })
}