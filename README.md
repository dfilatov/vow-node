Vow-node [![NPM version](https://badge.fury.io/js/vow-fs.png)](http://badge.fury.io/js/vow-fs) [![Build Status](https://secure.travis-ci.org/dfilatov/vow-node.png)](http://travis-ci.org/dfilatov/vow-node)
=========
Vow-node is a small extension for Vow to work with nodejs-style callbacks

Getting Started
---------------
###In Node.js###
You can install using Node Package Manager (npm):

    npm install vow-node

API
---

####promisify(fn)####
Transforms given function `fn` to a function that returns promise.
````javascript
var fs = require('fs'),
    readFile = vowNode.promisify(fs.readFile);

readFile('package.json').then(function(content) {
    console.log(content);
});

````

####invoke(fn, ...args)####
Invokes given function `fn` with arguments `args`.
````javascript
var fs = require('fs');

vowNode.invoke(fs.readFile, 'package.json').then(function(content) {
    console.log(content);
});

````
