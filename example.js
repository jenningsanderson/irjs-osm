var osmFeed = require('./lib/osm')
var num_results = 10

osmFeed.get('changesets',num_results)