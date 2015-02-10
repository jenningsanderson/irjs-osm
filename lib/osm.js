var events = require('events')
var fs  = require('fs')
var rss = require('parserss')

emitter = new events.EventEmitter();


// Reads BBOX config file and sets up URL for request function below
var bbox = fs.readFileSync('./bbox.config','utf8')
url = 'http://zverik.osm.rambler.ru/whodidit/scripts/rss.php?bbox=' + bbox


// Individual Operations that Handle Data Received from OSM API and Output it in Different Ways

// Titles
emitter.on('titles', function (result) {
  console.log(result['title']);
})

// Summaries
emitter.on('summaries', function (result) {
  console.log(result['summary']);
})

// Users
emitter.on('users', function (result) {
  start = result.description.indexOf(">") + 1
  end = result.description.indexOf("</a>")
  console.log(result.description.substr(start,end-start))
})

// Changeset
emitter.on('changesets', function (result) {
  console.log(result)
})


// Controller & API
module.exports = {

  get: function(operation, num_results) {
    // Make Request
    rss(url,num_results, function (err, res) {
      if (err) {
          console.log(err)
        }
      if (res) {
          // Pass individual results to relevant operation
          for (var i = 0; i<= res.articles.length; i++) {
            if (res.articles[i]) {
              emitter.emit(operation,res.articles[i])
            }
          }
        }
      }
    )
  }
}