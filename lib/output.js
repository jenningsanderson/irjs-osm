//Different Output options
var fs  = require('fs')

module.exports = {

	txt : function(data, dest, cb){
		var txt = ''
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
	}
}

function output(data, dest, cb){
 	// If there should be an outfile, then write it
	if (dest=='return'){
		cb( data )
	}
	else if (dest=='stdout'){
		console.log( data )
		cb
	}else{
		fs.writeFile(dest, data, function (err) {
			if (err) throw err
			console.log("Successfully saved "+dest+"!")
			cb
		})
	}
}