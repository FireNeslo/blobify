'use strict'

const through = require('through2');

module.exports = function blobify (file, options) {
  if (file.slice(-5) !== '.blob') return through();
  options = options || {};

  return through.obj((data, encoding, cb) => {
    const content = data.toString('base64');
    const blob = 'new Blob(["' + content + '"], {"type": "application/javascript"})';
    cb(null, new Buffer('module.exports = ' + blob));
  });
};
