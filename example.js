var osmFeed = require('./lib')

options = {}
options.limit = 3
options.outFile = 'db'

//You may pass a bbox in as a string, or as a location by using either of the following (not both).

//Pass a file:
options.bboxFile = './config.bbox'

//OR Pass a String
options.bbox = '-112.076415,46.572087,-111.982267,46.629261'

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'trace'
});

client.search({
	q: 'pants'
}).then(function (body) {
	var hits = body.hits.hits;
}, function (error) {
	console.trace(error.message);
});

//Print out the changesets
osmFeed.get(options, osmFeed.changesets, function(res){
	console.log(res)
})
