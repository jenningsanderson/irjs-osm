var rss = require('parserss');

rss('http://zverik.osm.rambler.ru/whodidit/scripts/rss.php?bbox=-105.3424072,39.946595,-105.1872253,40.0938316', 10, function (err, res) {
  console.log(err);
  console.log(res);
});