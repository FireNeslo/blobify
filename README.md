blobify
===

browserify transform that allows you to require a file as a blob

## Install
```bash
$ npm install FireNeslo/blobify --save-dev
```

## Usage

### CLI
```bash
$ browserify file.blob -t blobify --outfile blobified.js
```
### Node
```js
var fs = require("fs");
var browserify = require("browserify");
var blobify = require("blobify");

browserify("./file.blob")
  .transform(blobify).bundle()
  .pipe(fs.createWriteStream("blobified.js"));
```
