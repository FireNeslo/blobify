'use strict'

const through = require('through2');
const mime = require('mime');

const defaultExtensions = ['.blob']

module.exports = function blobify (file, options) {
  if(options == null) options = { extensions: defaultExtensions }
  if(Array.isArray(options)) options = { extensions: options }  
  
  try {
    var browserify = require('browserify')
  } catch(error) {
    options.bundle = false
  }
  const match = (entry) => file.slice(-entry.length) === entry
  const extensions = options.extensions || options._ || defaultExtensions
  
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
  if(mimetype === 'application/javascript' && options.bundle !== false) {
    return browserify(file, config).bundle()
      .pipe(through(concat, processBuffer));
  }
  return through(concat, processBuffer);
};
