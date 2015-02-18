//From: http://bohuco.net/blog/2014/03/elasticsearch-and-node-js-getting-started-example/

//http://127.0.0.1:1337/create?title=A%20nice%20title&tags=some,nice,tags
//http://127.0.0.1:1337/search?q=nice


function create(query) {

    var title = query.title;
    var tags = query.tags.split(',');

    var D = new Date();
    var date = parseInt(D.getTime()/1000);

    client.create({
        index: 'myindex',
        type: 'mytype',
        // id: '1',
        body: {
            title: title,
            tags: tags,
            published: true,
            published_at: date,
        }
    }, function (error, response) {
        // ...
    });

    eventEmitter.emit('doOutput', {message:'okay'});
}


function search(query) {

    var q = '';
    if (query.q) {
        q = query.q;
    }

    client.search({
        q: q,
    }).then(function (body) {
        eventEmitter.emit('doOutput', {message:'okay', hits:body.hits.hits});
    }, function (error) {
        console.trace(error.message);
    });
}


function output(data) {

    response.writeHead(200, {'Content-Type': 'text/html'});

    if(data.hits) {
        str = '';
        for(i=0; i<data.hits.length; i++) {
            var hit = data.hits[i];

            var D = new Date(hit._source.published_at*1000);
            var published = util.format('%s-%s-%s',
                D.getFullYear(), D.getMonth(), D.getDate());

            str += util.format('%s - %s (Score: %s, ID: %s)',
                hit._source.title, published, hit._score, hit._id);
        }
        response.end(str+'\n');
    } else {
        response.end(data.message+'\n');
    }
}

var util = require('util');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var http = require('http');
var url = require('url');
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'trace'
});
var response = null;

eventEmitter.on('doOutput', output);

http.createServer(function(req, res) {

    response = res;
    var parsedUrl = url.parse(req.url, true);

    if(parsedUrl.pathname == '/create') {
        create(parsedUrl.query);
    } else if(parsedUrl.pathname == '/search') {
        search(parsedUrl.query);
    }

}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
