var rss = require('parserss')
var events = require('events')
emitter = new events.EventEmitter();

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

emitter.on('request', function(url,num_results,call) {
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

  titles: function(url,num_results) {
    emitter.emit('request',url,num_results,'titles')
  }, 

  summaries: function(url,num_results) {
    emitter.emit('request',url,num_results,'summaries')
  }, 

  users: function(url,num_results) {
    emitter.emit('request',url,num_results,'users')
  }, 

}