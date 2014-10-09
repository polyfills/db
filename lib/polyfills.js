
// to do:
// https://github.com/medikoo/es6-symbol
// https://github.com/tvcutsem/harmony-reflect
// function.create?
// string.prototype.at?

var inherits = require('util').inherits
var Feature = require('./feature')

module.exports = Polyfill

inherits(Polyfill, Feature)

function Polyfill(options) {
  if (!(this instanceof Polyfill)) return new Polyfill(options)

  Feature.call(this, options)

  // used for the website
  this.features = options.features || []
  this.sources = options.sources || []
}

Polyfill.polyfills = []
Polyfill.polyfill = {}
Polyfill.register = function (obj) {
  var polyfill = new Polyfill(obj)
  Polyfill.polyfill[obj.name] =
  Polyfill.polyfill[obj.shortName] = polyfill
  Polyfill.polyfills.push(polyfill)
}

require('./polyfills.json').forEach(Polyfill.register)
