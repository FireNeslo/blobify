'use strict'

const browserify = require('browserify')
const blobify = require('blobify')

browserify(__dirname + '/index.js')
.transform(blobify, ['blob1', 'blob2'])
//.transform(blobify, { extensions: ['blob1', 'blob2'] })
.bundle()
.on('error', console.error)
.pipe(process.stdout)
