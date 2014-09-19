
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
}

Polyfill.polyfills = []
Polyfill.polyfill = {}
Polyfill.register = function (obj) {
  var polyfill = new Polyfill(obj)
  Polyfill.polyfill[obj.name] =
  Polyfill.polyfill[obj.shortName] = polyfill
  Polyfill.polyfills.push(polyfill)
}

Polyfill.register({
  name: 'domelements',
  shortName: 'domels',
  url: '/barberboy/dom-elements/master/lib/dom-elements.js',
})

Polyfill.register({
  name: 'dom4',
  url: '/webreflection/dom4/master/build/dom4.js',
})

// http://caniuse.com/requestanimationframe
Polyfill.register({
  name: 'requestanimationframe',
  shortName: 'raf',
  url: '/darius/requestAnimationFrame/master/requestAnimationFrame.js',
  browsers: {
    ie: 10,
    ff: 23,
    chrome: 24,
    ios: 7,
    safari: 6.1,
    android: 4.4,
    opera: 15,
  }
})

// write here looks disharmony. objectobserve need native setImmediate for performance.
// http://kangax.github.io/compat-table/es7/
Polyfill.register({
  name: 'objectobserve',
  shortName: 'oobs',
  url: '/jdarling/Object.observe/master/Object.observe.poly.js',
  browsers: {
    chrome: 33
  }
})

// https://developer.mozilla.org/en-US/docs/Web/API/Window.setImmediate
Polyfill.register({
  name: 'setimmediate',
  shortName: 'si',
  url: '/YuzuJS/setImmediate/master/setImmediate.js',
  browsers: {
    ie: 10
  }
})

// http://caniuse.com/eventsource
Polyfill.register({
  name: 'eventsource',
  shortName: 'es',
  url: '/Yaffle/EventSource/master/eventsource.js',
  browsers: {
    ff: 6,
    chrome: 6,
    ios: 4,
    safari: 5,
    android: 4.4,
    opera: 11
  }
})

// http://caniuse.com/promises
Polyfill.register({
  name: 'promise',
  url: 'http://s3.amazonaws.com/es6-promises/promise-1.0.0.js',
  browsers: {
    // ie: 12,
    ff: 29,
    chrome: 33,
    ios: 8,
    safari: 8,
    opera: 20,
  }
})

// http://kangax.github.io/compat-table/es5/
Polyfill.register({
  name: 'es5',
  url: '/es-shims/es5-shim/master/es5-shim.js',
  browsers: {
    ie: 9, // fuck strict mode
    ff: 4,
    ios: 6,
    safari: '5.1.4',
    chrome: 19, // meh
    opera: '12.10',
    android: 4,
    default: false,
  }
})

// https://developer.mozilla.org/en-US/docs/Web/API/Window.btoa
Polyfill.register({
  name: 'base64',
  shrotName: 'b64',
  url: '/davidchambers/Base64.js/master/base64.js',
  browsers: {
    ie: 10,
    default: false
  }
})

// https://developer.mozilla.org/en-US/docs/Web/API/Performance.now()
Polyfill.register({
  name: 'performancenow',
  shortName: 'pnow',
  url: 'https://gist.githubusercontent.com/paulirish/5438650/raw/9912fea136c32c58ae086372a2083813d984c6da/performance.now()-polyfill.js',
  browsers: {
    ie: 10,
    ff: 15,
    chrome: 24,
    android: 4,
    opera: 15
  }
})

// https://developer.mozilla.org/en-US/docs/Web/API/Window.matchMedia
Polyfill.register({
  name: 'matchmedia',
  shortName: 'mm',
  url: '/paulirish/matchMedia.js/master/matchMedia.js',
  browsers: {
    ie: 10,
    ff: 6,
    chrome: 9,
    ios: 5,
    safari: 5.1,
    android: 3,
    opera: 12.1
  }
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
Polyfill.register({
  name: 'stringfromcodepoint',
  shortName: 'sfcp',
  url: '/mathiasbynens/String.fromCodePoint/master/fromcodepoint.js',
  browsers: {
    ff: 29
  }
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
Polyfill.register({
  name: 'stringprototypecodepointat',
  shortName: 'spcpa',
  url: '/mathiasbynens/String.prototype.codePointAt/master/codepointat.js',
  browsers: {
    ff: 29
  }
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
Polyfill.register({
  name: 'stringprototyperepeat',
  shortName: 'spr',
  url: '/mathiasbynens/String.prototype.repeat/master/repeat.js',
  browsers: {
    ff: 24
  }
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
Polyfill.register({
  name: 'stringprototypestartswith',
  shortName: 'spsw',
  url: '/mathiasbynens/String.prototype.startsWith/master/startswith.js',
  browsers: {
    ff: 17
  }
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
Polyfill.register({
  name: 'stringprototypeendswith',
  shortName: 'spew',
  url: '/mathiasbynens/String.prototype.endsWith/master/endswith.js',
  browsers: {
    ff: 17
  }
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/contains
Polyfill.register({
  name: 'stringprototypecontains',
  shortName: 'spc',
  url: '/mathiasbynens/String.prototype.contains/master/contains.js',
  browsers: {
    ff: 18
  }
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
Polyfill.register({
  name: 'arrayfrom',
  shortName: 'afrom',
  url: '/mathiasbynens/Array.from/master/array-from.js',
  browsers: {
    ff: 32
  }
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
Polyfill.register({
  name: 'arrayof',
  shortName: 'aof',
  url: '/mathiasbynens/Array.of/master/array-of.js',
  browsers: {
    ff: 25
  }
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
Polyfill.register({
  name: 'arrayprototypefind',
  shortName: 'apf',
  url: '/paulmillr/Array.prototype.find/master/index.js',
  browsers: {
    ff: 25
  }
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
Polyfill.register({
  name: 'arrayprototypefindindex',
  shortName: 'apfi',
  url: '/paulmillr/Array.prototype.findIndex/master/index.js',
  browsers: {
    ff: 25
  }
})

// https://github.com/mathiasbynens/RegExp.prototype.search
Polyfill.register({
  name: 'regexpprototypesearch',
  shortName: 'reps',
  url: '/mathiasbynens/RegExp.prototype.search/master/regexp-prototype-search.js',
})

// https://github.com/mathiasbynens/RegExp.prototype.match
Polyfill.register({
  name: 'regexpprototypematch',
  shortName: 'repm',
  url: '/mathiasbynens/RegExp.prototype.match/master/regexp-prototype-match.js',
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf#Browser_compatibility
Polyfill.register({
  name: 'objectsetprototypeof',
  shortName: 'ospo',
  url: '/polyfills/Object.setPrototypeOf/master/index.js',
  browsers: {
    ff: 31,
    chrome: 34,
  }
})
