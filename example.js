var osmFeed = require('./lib')

options = {}
options.limit = 3
options.outFile = 'db'

//You may pass a bbox in as a string, or as a location by using either of the following (not both).

//Pass a file:
options.bboxFile = './config.bbox'

//OR Pass a String
options.bbox = '-112.076415,46.572087,-111.982267,46.629261'

//Print out the changesets
osmFeed.get(options, osmFeed.changesets, function(res){
	console.log(res)
})
