IRJS-OSM
========

IRJS OSM Tool

![Travis CI](https://travis-ci.org/jenningsanderson/irjs-osm.svg)


## CLI
### Installation

	$ npm install -g irjs-osm

### Usage
	Usage: irosm [options] [command]
	Commands:
		titles       Titles of Latest Changesets
		summaries    Summaries of Latest Changesets
		users        List all users who contributed
		changesets   List all changesets

	Options:
		-h, --help                        Show this message
		-l, --limit <n>                   A limit for the number of results
		-f, --format <string>             The desired format of the output
		-o, --outFile <path/to/file.ext>  A file to write the output, defaults to stdout


### Example

	$ irosm changesets -l 3 -f csv
		
	#	ID,Title,User,Link
	#	28724851,removed a blockbuster,TheDutchMan13,http://openstreetmap.org/browse/changeset/28724851
	#	28707104,us36 n of boulder,Mark Newnham,http://openstreetmap.org/browse/changeset/28707104
	#	28704512,boulder canyon boulevard,Mark Newnham,http://openstreetmap.org/browse/changeset/28704512

	$ irosm changesets -l 3 -f csv -o output.csv
	
	# 	Successfully saved output.csv!

	
## API

```javascript

var osmFeed = require('./lib')

options = {}
options.limit = 3
options.format = 'json'
options.outFile = 'return'

//Print out the changesets
osmFeed.get(options, osmFeed.changesets, function(res){
	console.log(res)
})


```


## Test

	$ mocha