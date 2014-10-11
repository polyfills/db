var inherits = require('util').inherits
var Feature = require('./feature')

module.exports = Transform

inherits(Transform, Feature)

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options)

  options.name = options.name || options.module.replace(/^postcss-/, '')
  Feature.call(this, options)
  if (options.transform) this.transform = options.transform
}

// whether to use this transform or not
// i'm not 100% sure about the API here, but ideally
// this is for something like RTL support
Transform.prototype.use = function () {
  return true
}

Transform.prototype.transform = function (options) {
  return this.module(options)
}

Transform.transforms = []
Transform.transform = {}
Transform.register = function (obj) {
  var transform = new Transform(obj)
  Transform.transform[transform.name] =
  Transform.transform[transform.shortName] = transform
  Transform.transforms.push(transform)
}

// autoprefixer is probably easier to not include as one of these
// transform abstractions. we'll just be sure to include it manually.
Transform.register({
  name: 'autoprefixer',
  module: 'autoprefixer-core',
  transform: function () {
    return this.module().postcss
  }
})

require('./postcss.json').forEach(Transform.register)
