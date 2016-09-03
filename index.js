'use strict'

const through = require('through2');
const mime = require('mime');

module.exports = function blobify (file, options) {
  if (Array.isArray(options)) options = {extensions: options}
  else options = Object.assign({extensions: ['.blob']}, options)
  
  const match = (entry) => file.slice(-entry.length) === entry
  const extensions = options.extensions || options._
  
  if (!extensions.some(match)) return through()
  const mimetype = mime.lookup(file)
  const buffers = []

  function concat(buffer, encoding, next) {
    buffers.push(buffer);
    next()
  }

  function processBuffer(done) {
    const content = Buffer.concat(buffers).toString('base64');
    const blob = 'new Blob(["' + content + '"], {"type": "'+mimetype+'"})';
    this.push(new Buffer('module.exports = ' + blob))
    done()
  }
  return through(concat, processBuffer);
};