// In your app your app you'd:
// 1. npm install everywhere --save
// 1. var everywhere = require('everywhere'); // wherever you need it
var everywhere = require('../../../index.js');


var config = everywhere.get('config'); // No relative path to ./config !!!
module.exports = function runExample() {
    console.log(config());
};