
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
  else if (options.browsers) this.filter = buildFilter(options.browsers)
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

// build a filter function from an object of browsers
// order matters!
var families = {
  ie: /\bie\b/i,
  ff: /\bfirefox\b/i,
  chrome: /\bchrome\b/i,
  ios: /\bmobile safari\b/i, // needs to be before safari
  safari: /\bsafari\b/i,
  android: /\bandroid\b/i,
  opera: /\bopera\b/i,
  ffm: /\bfirefox mobile\b/i,
  iep: /\bie phone\b/i,
}

function buildFilter(browsers) {
  var str = 'var family = agent.family\n'
  Object.keys(families).forEach(function (name) {
    if (name in browsers) {
      str += 'if (families.' + name + '.test(family)) '
        + 'return agent.satisfies("< ' + browsers[name] + '")\n'
    }
  })
  str += 'return ' + String(browsers.default !== false)
  return eval('(function filter(agent) {\n' + str + '\n})')
}
