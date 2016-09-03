blobify
===

A [Browserify](http://browserify.org/) transform that allows you to bundle a file as a blob.

[![npm version](https://img.shields.io/npm/v/blobify.svg)](https://www.npmjs.com/package/blobify)
[![dependency status](https://img.shields.io/david/FireNeslo/blobify.svg)](https://david-dm.org/FireNeslo/blobify)
![ISC-licensed](https://img.shields.io/github/license/FireNeslo/blobify.svg)

## Install

```bash
$ npm install FireNeslo/blobify --save-dev
```

## Usage

### CLI

```shell
browserify index.js -t [ blobify blob1 blob2 ] > bundle.js
```

### Node

```js
const browserify = require('browserify');
const blobify = require('blobify');
const fs = require('fs');

browserify(__dirname + '/index.js')
.transform(blobify, { extensions: ['blob1', 'blob2'] })
.bundle()
  .on('error', console.error)
  .pipe(fs.createWriteStream('bundle.js')
```
