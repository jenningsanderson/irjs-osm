//Different Output options
var fs  = require('fs')
var MongoClient = require('mongodb').MongoClient, format = require('util').format;

module.exports = {

	txt : function(data, dest, cb){
		var txt = ''
		console.log(data)
		for(var i=0; i<data.data.length; i++){
			txt += data.data[i].join(',')
			if (i<data.data.length-1){ txt+="\n"}
		}
		output(txt, dest, cb)
	},

	json : function(data, dest, cb){
		json = '{\"'+data.meta.collection+"\" : [\n"

		for (var j=0; j<data.data.length; j++){
			row = data.data[j]
			json+="\t\t{\n"
			for (var i=0; i<row.length; i++){
				if (i<row.length-1){
					json += '\t\t\t\"'+data.meta.headers[i]+"\" : \""+row[i].replace(/\"/g, "\\\"")+"\",\n"
				}else{
					json += '\t\t\t\"'+data.meta.headers[i]+"\" : \""+row[i].replace(/\"/g, "\\\"")+"\""
				}
			}
			json+="\n\t\t}"
			if (j<data.data.length-1){json+=',\n'}else{json+='\n\t]\n'}
		}
		json += '}'
		output(json, dest, cb)
	},

	csv : function(data, dest, cb){
		if (data.meta.headers){csvs = data.meta.headers.join(',')+"\n"}else{csvs=''}
		for (var j=0; j<data.data.length; j++){
			csvs += data.data[j].join(',')+"\n"
		}
		output(csvs, dest, cb)
	},

	mongo : function(data, dest, cb){
		//https://github.com/mongodb/node-mongodb-native/blob/master/Readme.md
		//Connect locally -- TODO: Read from a configuration file
		MongoClient.connect('mongodb://127.0.0.1:27017/irosm', function(err, db) {
			if(err) throw err;
			var rows = 0
			var collection = db.collection(data.meta.collection.toLowerCase());

			//Make some objects:
			for (var j=0; j<data.data.length; j++){
				this_entry = {}
				for (var i=0; i<data.data[j].length; i++){
					this_entry[data.meta.headers[i]] = data.data[j][i]
				}
				// console.log(this_entry)
				collection.insert(this_entry, function(err, docs) {
					rows += 1
				});
			}
			db.close();
			output(rows, 'mongo', cb)
		});
	}
}

function output(data, dest, cb){
	if (dest=='return'){
		cb( data )
	}
	else if (dest=='stdout'){
		console.log( data )
		cb
	}else if (dest=='mongo'){
		console.log("Added "+data+ " entries to mongo")
		cb
	}else{ // If there should be an outfile, then write it
		fs.writeFile(dest, data, function (err) {
			if (err) throw err
			console.log("Successfully saved "+dest+"!")
			cb
		})
	}
}
