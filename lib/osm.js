var events = require('events')
var fs  = require('fs')
var rss = require('parserss')

emitter = new events.EventEmitter();

// Reads BBOX config file and sets up URL for request function below
var bbox = fs.readFileSync('./bbox.config','utf8')
url = 'http://zverik.osm.rambler.ru/whodidit/scripts/rss.php?bbox=' + bbox

// Individual Operations that Handle Data Received from OSM API and Output it in Different Ways
emitter.on('titles', function (res) {
  for (var i = 0; i<= res.articles.length; i++) {
    if (res.articles[i]) {
      console.log(res.articles[i]['title']);
    }
  }
})

emitter.on('summaries', function (res) {
  for (var i = 0; i<= res.articles.length; i++) {
    if (res.articles[i]) {
      console.log(res.articles[i]['summary']);
    }
  }
})

emitter.on('users', function (res) {
  for (var i = 0; i<= res.articles.length; i++) {
    if (res.articles[i]) {
      start = res.articles[i].description.indexOf(">") + 1
      end = res.articles[i].description.indexOf("</a>")

      console.log(res.articles[i].description.substr(start,end-start))
    }
  }
})

// Request Function - Makes the Call to the OSM API, then uses emitter to pass results to appropriate operation
emitter.on('request', function(operation,num_results) {
  rss(url,num_results, 
    function (err, res) {
      if (err) {
          console.log(err);
        }
      if (res) {
        emitter.emit(operation,res)
      }
    }
  )
})

// Controller & API
module.exports = {

  get: function(operation,num_results) {
      emitter.emit('request',operation,num_results)
  }

}