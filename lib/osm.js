var rss = require('parserss');

rss('http://positron96.appspot.com/osmfilter.rss?feed=http%3A%2F%2Fwww.openstreetmap.org%2Fhistory%2Ffeed&slat=20&slon=40', 10, function (err, res) {
  console.log(err);
  console.log(res);
});