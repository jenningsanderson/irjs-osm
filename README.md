
IRJS-OSM
========
[![Build Status](https://travis-ci.org/jenningsanderson/irjs-osm.svg?branch=master)](https://travis-ci.org/jenningsanderson/irjs-osm)

This is a command line tool for working with the lateset OpenStreetMap data for a specific bounding box.  The tool relies on pulling the latest changeset information from the [WhoDidIt project](http://zverik.osm.rambler.ru/whodidit/)


Bounding Box: A bounding box of the standard form: LL, UR as a string of 4 numbers, comma separated:

	-105.3424072,39.946595,-105.1872253,40.0938316

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
		-b, --bbox <path/to/bbox.config>  The bounding box configuration file, defaults to ./bbox.config



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

var osmFeed = require('irjs-osm')

options = {}
options.limit = 3
options.format = 'json'
options.outFile = 'return'

//You may pass a bbox in as a string, or as a location by using either of the following (not both, the options.bbox will override).

//Pass a file:
options.bboxFile = './config.bbox'

//OR Pass a String
options.bbox = '-105.3424072,39.946595,-105.1872253,40.0938316'

//Print out the changesets
osmFeed.get(options, osmFeed.changesets, function(res){
	console.log(res)
})


```


## Test

	$ mocha


## Other
[Elastic Search vs. MongoDB Review for irjs-osm](https://docs.google.com/presentation/d/1RSO3FcDtvshc5R0cgh0M_w-2FAvZBG50k45aDSq7i00/edit?usp=sharing)
