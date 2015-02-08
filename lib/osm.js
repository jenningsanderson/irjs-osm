var events = require('events')
emitter = new events.EventEmitter();
var fs  = require('fs')
var rss = require('parserss')

var bbox = fs.readFileSync('./bbox.config','utf8')
url = 'http://zverik.osm.rambler.ru/whodidit/scripts/rss.php?bbox=' + bbox

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

emitter.on('request', function(call,num_results) {
  rss(url, num_results, 
    function (err, res) {
      if (err) {
          console.log(err);
        }
      if (res) {
        emitter.emit(call, res)
      }
    }
  )
})

module.exports = {

  get: function(operation,num_results) {
      emitter.emit('request',operation,num_results)
  }

}