'use strict'

const through = require('through2');

module.exports = function blobify (file, opt) {
  opt = opt || {};
  const match = (entry) => file.slice(-entry.length) === entry
  if (!opt._.some(match)) return through()

  return through.obj((data, encoding, cb) => {
    const content = data.toString('base64');
    const blob = 'new Blob(["' + content + '"], {"type": "application/javascript"})';
    cb(null, new Buffer('module.exports = ' + blob));
  });
};
