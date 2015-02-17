var fs  = require('fs')
var rss = require('parserss')


module.exports = function(options, func, cb) {

  var url = 'http://zverik.osm.rambler.ru/whodidit/scripts/rss.php?bbox='

  //Parse out options
  var num_results = options.limit   || 30
  var outFile     = options.outFile || 'stdout'
  var format      = options.format  || 'txt'

  //Flag to put it to Mongo
  if ((format == 'mongo') || (outFile == 'db')){
    format = 'mongo'
  }

  if (options.bbox){
    url += options.bbox
  }else{
    var bbox_loc = options.bboxPath || './bbox.config'
    url += fs.readFileSync(bbox_loc,'utf8')
  }

  // Make Request
  rss(url, num_results, function (err, res) {
    if (err) { console.log(err) }

    // If there is a result, pass it to the desired function
    if (res) {
    	func(res.articles, outFile, module.parent.exports.output[format], cb)
    }
  })
}
