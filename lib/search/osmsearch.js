var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: '127.0.0.1',
  port: '9200',
  keepAlive: true
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
