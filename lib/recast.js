
var inherits = require('util').inherits
var Feature = require('./feature')

module.exports = Transform

inherits(Transform, Feature)

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options)

  options.name = options.name || options.module.replace(/^es6-/, '')
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

Transform.register({
  module: 'es6-destructuring'
})

Transform.register({
  module: 'es6-shorthands',
})

Transform.register({
  module: 'es6-class',
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/arrow_functions
Transform.register({
  module: 'es6-arrow-function',
  shortName: 'arrowfn',
  browsers: {
    ff: 24, // read firefox notes
  }
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
Transform.register({
  name: 'generators',
  module: 'regenerator',
  shortName: 'gens',
  runtime: 'regenerator/runtime.js',
  browsers: {
    // chrome is behind a flag still, which doesn't count
    // http://www.chromestatus.com/features/4959347197083648#generator
    ff: 26,
  }
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings
Transform.register({
  module: 'es6-templates',
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/default_parameters
Transform.register({
  module: 'es6-default-params',
  browsers: {
    ff: 15
  }
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/rest_parameters
Transform.register({
  module: 'es6-rest-params',
  browsers: {
    ff: 15
  }
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
Transform.register({
  module: 'es6-spread',
  browser: {
    ff: 27
  }
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Array_comprehensions
Transform.register({
  module: 'es6-comprehensions',
  browsers: {
    ff: 30
  }
})
