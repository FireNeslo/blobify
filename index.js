var browserify = require('browserify')
var through = require('through2')
var concat = require('concat-stream')

module.exports = function blobify(file, options) {
  if(file.indexOf('.blob') < 0) return through()
  var bundle, stream;
  function onBuffer(buffer, encoding, callback) {
    bundle.pipe(concat(function blobWrap(blobdata) {
      var content = '['+JSON.stringify(blobdata.toString())+']'
      var blob = 'new Blob('+content+', {"type":"application/javascript"});'
      var exports = new Buffer('module.exports = ' + blob)
      stream.push(exports)
      callback()
    }))
  }
  bundle = browserify(file, options).bundle()
  return (stream = through(onBuffer))
}
