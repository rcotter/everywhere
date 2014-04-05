# Everywhere

Every once in a while there are project specific files that must be require'd
repeatedly. A good example is a config file, located at the project's root
and used throughout. Unless we're using a fancy configuration module, the common result
is many requires sprinkled throughout the code with varying relative paths.
This works fine but is ugly, tiresome and a pain during refactoring.

**Everywhere** to the rescue. It is a simple, singleton registry. Lets consider
a simple project structure.

    app.js
    config.js
    - lib
        - controllers
            - c1.js
            - c2.js
        - models
            - models-for-A
                - mA.js
            - models-for-B
                - mB.js

Commonly, **config.js** will be need within **controllers** and **models**.
The default solution is:

    app.js
    config.js
    - lib
        - controllers
            - c1.js
                var config = require('../..config');
            - c2.js
                var config = require('../..config');
        - models
            - models-for-A
                - mA.js
                    var config = require('../../../config');
            - models-for-B
                - mB.js
                    var config = require('../../../config');

Using **everywhere** this becomes:

    app.js
        var failedPath = require('everywhere').addLookup('config', './config');
        if (failedPath) {
            console.error("The module/file '%s' does not exist", failedPath);
            return process.exit(1);
        }

    config.js
    - lib
        - controllers
            - c1.js
                var config = require('everywhere').get('config');
            - c2.js
                var config = require('everywhere').get('config');
        - models
            - models-for-A
                - mA.js
                    var config = require('everywhere').get('config');
            - models-for-B
                - mB.js
                    var config = require('everywhere').get('config');

Simple, consistent and resistant to refactoring...and easy to abuse. Remember,
often it's better to pass values in as parameters instead of breaking encapsulation.