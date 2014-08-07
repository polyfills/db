
var fs = require('fs')
var memo = require('memorizer')

var agents = require('./agents')

module.exports = Feature

function Feature(options) {
  if (!(this instanceof Feature)) return new Feature(options)

  // the name of this feature
  this.name = options.name
  // a shortname for this feature
  this.shortName = options.shortName || options.name
  // the module associated with this feature
  this.moduleName = options.module
  // optional URL to download this file
  this.url = options.url

  if (options.filter) this.filter = options.filter
  else if (options.browsers) this.filter = agents.compile(options.browsers)
  if (options.detect) this.detect = options.detect
  if (options.runtime) this.runtimeFilename = options.runtime
}

// by default, a feature is always enabled
Feature.prototype.filter =
// by default, a feature is assumed to be detected
// note that detections expect you to strip out comments first
Feature.prototype.detect = function () {
  return true
}

// to do: REMOVE THIS
Feature.prototype.id = function () {
  return this.shortName
}

// lazily get the underlying module if any
memo(Feature.prototype, 'module', function () {
  return require(this.moduleName)
})

// get the version of the module
memo(Feature.prototype, 'version', function () {
  return require('./' + this.moduleName + '/package.json').version
})

// get the runtime as a string
// should we keep this in memory!?
memo(Feature.prototype, 'runtime', function () {
  var filename = require.resolve(this.runtimeFilename)
  return fs.readFileSync(filename, 'utf8')
})
