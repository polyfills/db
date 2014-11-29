
var inherits = require('util').inherits
var Feature = require('./feature')

module.exports = Transform

inherits(Transform, Feature)

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options)

  options.name = options.name || options.module.replace(/^es[67]-/, '')
  Feature.call(this, options)
}

// .transform(ast) with lazy laoding
Transform.prototype.transform = function (ast) {
  return this.module.transform(ast)
}

Transform.transforms = []
Transform.transform = {}
Transform.register = function (obj) {
  var transform = new Transform(obj)
  Transform.transform[transform.name] =
  Transform.transform[transform.shortName] = transform
  Transform.transforms.push(transform)
}

require('./recast.json').forEach(Transform.register)
