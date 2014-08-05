var inherits = require('util').inherits
var Feature = require('./feature')

module.exports = Transform

inherits(Transform, Feature)

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options)

  options.name = options.name || options.module.replace(/^postcss-/, '')
  Feature.call(this, options)
  if (options.options === false) this.transform = transformNoOption
  else if (options.transform) this.transform = options.transform
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

// because of postcss' inconsistent API
function transformNoOption() {
  return this.module
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
  module: 'autoprefixer',
  transform: function (browsers) {
    return this.module(browsers).postcss
  }
})

// http://caniuse.com/calc
// https://developer.mozilla.org/en-US/docs/Web/CSS/calc
// note: this is kind of meh because you might want to do calculations
// on browsers that support calc, i.e. if you do stuff like `100px + 200px`
Transform.register({
  options: false,
  module: 'postcss-calc',
  detect: function (str) {
    return /\bcalc\(/.test(str)
  },
  browsers: {
    ie: 9,
    ff: 19,
    chrome: 27,
    safari: 6,
    opera: 13, // not sure
    android: '4.4',
    ios: '6.1.4',
  }
})
