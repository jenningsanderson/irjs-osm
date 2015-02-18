var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost',
  port: 9200,
  log: 'trace'
});



client.ping({
  requestTimeout: 1000,
  hello: "elasticsearch!"
}, function (error) {
  if (error) {
    console.log(error);
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});


client.search({
  index: 'twitter',
  type: 'tweets',
  body: {
    query: {
      match: {
        body: 'elasticsearch'
      }
    }
  }
}).then(function (resp) {
    var hits = resp.hits.hits;
}, function (err) {
    console.trace(err.message);
});
