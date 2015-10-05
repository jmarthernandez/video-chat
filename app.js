var express = require('express');
var browserify = require('browserify-middleware')
 
var app = express();

var vendorLibs = ['simple-peer']
app.get('/js/vendor-bundle.js', browserify(vendorLibs))

app.get('/js/app-bundle.js',
  browserify('./public/index.js', {
    bundleExternal: false
  }))

app.use(express.static(__dirname + '/public'));


var port = process.env.PORT || 3000;
console.log('listening on port: ' + port);
app.listen(3000);