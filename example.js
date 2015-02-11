var osmFeed = require('./lib')


options = {}
options.limit = 3
options.format = 'json'
options.outFile = 'return'

//Print out the changesets
osmFeed.get(options, osmFeed.changesets, function(res){
	console.log(res)
})