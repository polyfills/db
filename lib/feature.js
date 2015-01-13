
var memo = require('memorizer')
var ua = require('polyfill-ua')
var fs = require('fs')

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
  if (options.url) {
    this.url = options.url[0] === '/'
      ? 'https://raw.githubusercontent.com' + options.url
      : options.url
  }
  // github repo
  this.repo = options.repo
  // supersets
  this.supersets = options.supersets || []

  if (typeof options.filter === 'function') {
    this.filter = options.filter
  } else if (typeof options.browsers === 'object') {
    this.filter = ua.compile(options.browsers)
  } else if (typeof options.caniuse === 'string') {
    this.filter = ua.caniuse(options.caniuse)
  }

  if (options.runtime) this.runtimeFilename = options.runtime
}

// by default, a feature is always enabled
Feature.prototype.filter = function () {
  return true
}

// lazily get the underlying module if any
memo(Feature.prototype, 'module', function () {
  return require(this.moduleName)
})

// get the version of the module
memo(Feature.prototype, 'version', function () {
  return require(this.moduleName + '/package.json').version
})

// get the runtime as a string
// should we keep this in memory!?
memo(Feature.prototype, 'runtime', function () {
  if (!this.runtimeFilename) return false
  var filename = require.resolve(this.runtimeFilename)
  return fs.readFileSync(filename, 'utf8')
})
