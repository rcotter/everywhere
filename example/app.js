var everywhere = require('../index');

var failedPath1 = everywhere.addLookup('config', './config');
if (failedPath1) {
    console.error("NOT EXPECTED: The module/file '%s' does not exist", failedPath1);
    return process.exit(1);
}

require('./nested/nested/example')(); // Uses config and prints success message

var failedPath2 = everywhere.addLookup('need-it', './not-there');
if (failedPath2) {
    console.error("EXPECTED: The module/file '%s' does not exist", failedPath2);
    return process.exit(1);
}