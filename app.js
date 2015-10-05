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

console.log('listening on port: ' + process.env.PORT || 5000);
app.listen(process.env.PORT || 5000);