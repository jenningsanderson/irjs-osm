var parseString = require('xml2js').parseString;

module.exports = function (data, dest, callback, cb){
  var helpers = module.parent.exports.helpers
  var geodata = {}
  geodata.data = []
  geodata.meta = {'collection':'geodata',
          'headers':['ID','User', 'UserId','Created At', 'Closed At','Min Lat', 'Mon Lon', 'Max Lat', 'Max Lon', 'BBOX']}

  data.forEach(function(entry){
    id = helpers.extractChangesetID(entry)
    var bundle = []
    helpers.downloadChangeset(id, function(changeset){
      var xml = changeset.body
      parseString(xml, function (err, result, cb) {
        if (err) { console.log(err) }
        if (result) {
          bundle.push( [
            result.osm.changeset[0]['$'].id,
            result.osm.changeset[0]['$'].user,
            result.osm.changeset[0]['$'].uid,
            result.osm.changeset[0]['$'].created_at,
            result.osm.changeset[0]['$'].closed_at,
            result.osm.changeset[0]['$'].min_lat,
            result.osm.changeset[0]['$'].min_lon,
            result.osm.changeset[0]['$'].max_lat,
            result.osm.changeset[0]['$'].max_lon,
            [result.osm.changeset[0]['$'].min_lat,result.osm.changeset[0]['$'].min_lon,result.osm.changeset[0]['$'].max_lat,result.osm.changeset[0]['$'].max_lon] 
          ] )
        }
      })
      cb(bundle)
    })
    geodata.data.push(bundle)
  })
  callback(geodata, dest, cb)
}