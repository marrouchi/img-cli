/*
 * @Author: kerim selmi 
 * @Date: 2018-06-18 16:54:26 
 * @Last Modified by: kerim selmi
 * @Last Modified time: 2018-06-19 11:12:27
 */
var page = require('webpage').create();
var system = require('system');

if (system.args.length === 1) {
  console.log('Usage: loadspeed.js <some URL>');
  phantom.exit();
}

var url = system.args[1];
var debug = system.args[2];

var imageContentTypes = [
  'image/png',
  'image/jpeg',
  'image/gif'
];

if (debug) console.log('trying to open', url);

var images = [];

page.onResourceReceived = function(response) {
  var contentTypeHeader = response.headers.filter(function(header) {
    return header.name == 'Content-Type';
  })[0];
  var contentType = contentTypeHeader ? contentTypeHeader.value : '';
  if (imageContentTypes.indexOf(contentType) != -1) {
    if (debug) console.log('Receive', contentType, response.url);//, JSON.stringify(response.headers, undefined, 4));
    console.log('newimg')  
    images.push( {
      contentType: contentType,
      url: response.url
    })
  }
};

page.open(url, function() {
  console.log(JSON.stringify(images, undefined, 4));
  phantom.exit();
});