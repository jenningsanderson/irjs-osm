var elasticsearch = require('elasticsearch');

module.exports = function (data){
  console.log("Initializing ES")
  var client = new elasticsearch.Client({
    host: 'localhost:9200',
  });
  return client
}
