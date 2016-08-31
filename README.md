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
browserify index.js -t [ blobify blob1 blob2 ] > bundle.js
```
### Node
```js
const browserify = require('browserify');
const blobify = require('blobify');
const fs = require('fs');

browserify(__dirname + '/index.js')
.transform(blobify, {_: ['blob1', 'blob2']})
.bundle()
  .on('error', console.error)
  .pipe(fs.createWriteStream('bundle.js')
```
