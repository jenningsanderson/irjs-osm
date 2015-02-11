//Different Output options
var fs  = require('fs')

module.exports = {

	txt : function(data, dest){
		var txt = ''
		data.data.forEach(function(row){
			txt += row.join(',') + '\n'
		})
		output(txt, dest)
	},

	json : function(data, dest){
		json = '{\"'+data.meta.collection+"\" : [\n"
		
		for (var j=0; j<data.data.length; j++){
			row = data.data[j]
			json+="\t\t{\n"
			for (var i=0; i<row.length; i++){
				if (i<row.length-1){
					json += '\t\t\t\"'+data.meta.headers[i]+"\" : \""+row[i]+"\",\n"
				}else{
					json += '\t\t\t\"'+data.meta.headers[i]+"\" : \""+row[i]+"\""
				}
			}
			json+="\n\t\t}"
			if (j<data.data.length-1){json+=',\n'}else{json+='\n\t]\n'}
		}
		json += '}'
		output(json, dest)
	},

	csv : function(data, dest){
		if (data.meta.headers){csvs = data.meta.headers.join(',')+"\n"}else{csvs=''}
		for (var j=0; j<data.data.length; j++){
			csvs += data.data[j].join(',')+"\n"
		}
		output(csvs, dest)
	}
}

function output(data, dest){
 	// If there should be an outfile, then write it
	if (dest){
		fs.writeFile(dest, data, function (err) {
				if (err) throw err
				console.log("Successfully saved "+dest+"!")
		})
	} else {
		console.log( data )
	}
}