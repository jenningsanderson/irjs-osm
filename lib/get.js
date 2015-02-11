var fs  = require('fs')
var rss = require('parserss')

// var output = require('./output')

// Reads BBOX config file and sets up URL for request function below
var bbox = fs.readFileSync('./bbox.config','utf8')

url = 'http://zverik.osm.rambler.ru/whodidit/scripts/rss.php?bbox=' + bbox

module.exports = function(options, func, cb) {

  //Parse out options
  var num_results = options.limit  || 30
  var outFile     = options.outFile || 'stdout'
  var format      = options.format || 'txt'

  // Make Request  
  rss(url, num_results, function (err, res) {
    if (err) { console.log(err) }
    
    // If there is a result, pass it to the desired function
    if (res) { 
    	func(res.articles, outFile, module.parent.exports.output[format], cb)
    }
  })
}