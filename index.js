var path = require('path');
var fs = require('fs');


var lookup = {};

// Add a lookup
// Returns 'undefined' in success otherwise the absolute path that could not be found.
function addLookup(key, pathFromRoot) {
    "use strict";
    var absolutePath = path.resolve(process.cwd(), pathFromRoot);
    lookup[key] = absolutePath;

    if (!fs.existsSync(absolutePath) && !fs.existsSync(absolutePath + ".js")) {
        return absolutePath;
    }
}


// Retrieve module/file
function get(key) {
    "use strict";
    var absolutePath = lookup[key];
    if (!absolutePath) {
        console.error("'everywhere' cannot find a file path for '%s'", key);
    }

    return require(absolutePath);  // require's own caching makes this efficient
}


module.exports = {
    addLookup: addLookup,
    get: get
};

