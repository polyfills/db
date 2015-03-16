'use strict'

const Feature = require('polyfills-feature')
const inherits = require('util').inherits

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
  const polyfill = new Polyfill(obj)
  Polyfill.polyfill[obj.name] =
  Polyfill.polyfill[obj.shortName] = polyfill
  Polyfill.polyfills.push(polyfill)
}

require('./polyfills.json').forEach(Polyfill.register)
