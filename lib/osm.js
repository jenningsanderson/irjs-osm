var rss = require('parserss')

function osmFeed(url) {
  return {  

    titles: function titles() {
      rss(url, 5, 
        function (err, res) {
          if (err) {
              console.log(err);
            }
            for (var i = 0; i<= res.articles.length; i++) {
              if (res.articles[i]) {
                console.log(res.articles[i]['title']);
              }
            }
        }
      )
    },

    summaries: function summaries() {
      rss(url, 5, 
        function (err, res) {
          if (err) {
              console.log(err);
            }
            for (var i = 0; i<= res.articles.length; i++) {
              if (res.articles[i]) {
                console.log(res.articles[i]['summary']);
              }
            }
        }
      )
    }
  }
}

module.exports = osmFeed