var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
  keepAlive: true
});

// client.create({
//     index: 'myindex',
//     type: 'mytype',
//     id: '1',
//     body: {
//         title: 'This is a title',
//         tags: ['testing']
//     }
// }, function (error, response) {
//     console.log(error)
// });

client.search({
  q: 'title',
}).then(function (body) {
  console.log(body.hits)
}, function (error) {
    console.trace(error.message);
});
