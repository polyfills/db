
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
}

// lazily get the underlying module if any
Object.defineProperty(Feature.prototype, 'module', {
  get: function () {
    return this._module || (this._module = require(this.moduleName))
  }
})

// by default, a feature is always enabled
Feature.prototype.filter =
// by default, a feature is assumed to be detected
// note that detections expect you to strip out comments first
Feature.prototype.detect = function () {
  return true
}

Feature.prototype.id = function () {
  return this.shortName
}
