
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

Polyfill.register({
  name: 'classlist',
  shortName: 'clsls',
  url: '/eligrey/classList.js/master/classList.js',
  repo: 'eligrey/classList.js',
  features: [
    'Element.prototype.classList',
  ],
  sources: [
    'https://developer.mozilla.org/en-US/docs/Web/API/Element.classList',,
    'http://caniuse.com/#feat=classlist,'
  ],
  browsers: {
    chrome: 24,
    ff: 24,
    ie: 10,
    opera: 15,
    safari: 5.1,
    ios: 5.1,
    android: 3,
  }
})

Polyfill.register({
  name: 'matches',
  shortName: 'mtch',
  url: 'https://gist.githubusercontent.com/jonathantneal/3062955/raw/ad9d969c4e55581edbbb293c74135a751f586664/matchesSelector.polyfill.js',
  repo: 'https://gist.github.com/jonathantneal/3062955',
  features: [
    'Element.prototype.matches()',
  ],
  sources: [
    'http://caniuse.com/#feat=matchesselector',
    'https://developer.mozilla.org/en-US/docs/Web/API/Element.matches',
  ],
  browsers: {
    chrome: 34,
    ff: 34,
  }
})

Polyfill.register({
  name: 'domelements',
  shortName: 'domels',
  url: '/barberboy/dom-elements/master/lib/dom-elements.js',
  repo: 'barberboy/dom-elements',
  features: [
    'Element.prototype.query()',
    'Element.prototype.queryAll()',
  ],
})

Polyfill.register({
  name: 'dom4',
  url: '/webreflection/dom4/master/build/dom4.js',
  repo: 'webreflection/dom4',
  features: [
    'Element.prototype.prepend()',
    'Element.prototype.append()',
    'Element.prototype.before()',
    'Element.prototype.after()',
    'Element.prototype.replace()',
    'Element.prototype.remove()',
    'Element.prototype.matches()',
    'Element.prototype.classList',
  ],
})

Polyfill.register({
  name: 'requestanimationframe',
  shortName: 'raf',
  url: '/darius/requestAnimationFrame/master/requestAnimationFrame.js',
  repo: 'darius/requestAnimationFrame',
  features: [
    'requestAnimationFrame()',
    'cancelAnimationFrame()',
  ],
  sources: [
    'http://caniuse.com/requestanimationframe',
  ],
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
Polyfill.register({
  name: 'objectobserve',
  shortName: 'obs',
  url: '/jdarling/Object.observe/master/Object.observe.poly.js',
  repo: 'jdarling/Object.observe',
  features: [
    'Object.observe()',
  ],
  sources: [
    'http://kangax.github.io/compat-table/es7/',
  ],
  browsers: {
    chrome: 33
  }
})

Polyfill.register({
  name: 'setimmediate',
  shortName: 'si',
  url: '/YuzuJS/setImmediate/master/setImmediate.js',
  repo: 'YuzuJS/setImmediate',
  features: [
    'setImmediate()',
    'clearImmediate()',
  ],
  sources: [
    'https://developer.mozilla.org/en-US/docs/Web/API/Window.setImmediate',
  ],
  browsers: {
    ie: 10
  }
})

Polyfill.register({
  name: 'eventsource',
  shortName: 'es',
  url: '/Yaffle/EventSource/master/eventsource.js',
  repo: 'Yaffle/EventSource',
  features: [
    'new EventSource()',
  ],
  sources: [
    'http://caniuse.com/eventsource',
  ],
  browsers: {
    ff: 6,
    chrome: 6,
    ios: 4,
    safari: 5,
    android: 4.4,
    opera: 11
  }
})

Polyfill.register({
  name: 'promise',
  url: 'http://s3.amazonaws.com/es6-promises/promise-1.0.0.js',
  repo: 'jakearchibald/es6-promise',
  features: [
    'new Promise()',
  ],
  sources: [
    'http://caniuse.com/promises',
  ],
  browsers: {
    // ie: 12,
    ff: 29,
    chrome: 33,
    ios: 8,
    safari: 7.1,
    opera: 20,
  }
})

Polyfill.register({
  name: 'es5',
  url: '/es-shims/es5-shim/master/es5-shim.js',
  repo: 'es-shims/es5-shim',
  features: [],
  sources: [
    'http://kangax.github.io/compat-table/es5/',
  ],
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

Polyfill.register({
  name: 'base64',
  shortName: 'b64',
  url: '/davidchambers/Base64.js/master/base64.js',
  repo: 'davidchambers/Base64.js',
  features: [
    'atob()',
    'btoa()',
  ],
  sources: [
    'https://developer.mozilla.org/en-US/docs/Web/API/Window.btoa',
  ],
  browsers: {
    ie: 10,
    ff: 1.7,
    default: false
  }
})

Polyfill.register({
  name: 'performancenow',
  shortName: 'pnow',
  url: 'https://gist.githubusercontent.com/paulirish/5438650/raw/9912fea136c32c58ae086372a2083813d984c6da/performance.now()-polyfill.js',
  repo: 'https://gist.github.com/paulirish/5438650/',
  features: [
    'performance.now()',
  ],
  sources: [
    'https://developer.mozilla.org/en-US/docs/Web/API/Performance.now()',
  ],
  browsers: {
    ie: 10,
    ff: 15,
    chrome: 24,
    android: 4,
    opera: 15
  }
})

Polyfill.register({
  name: 'matchmedia',
  shortName: 'mm',
  url: '/paulirish/matchMedia.js/master/matchMedia.js',
  repo: 'paulirish/matchMedia.js',
  features: [
    'matchMedia()',
  ],
  sources: [
    'https://developer.mozilla.org/en-US/docs/Web/API/Window.matchMedia',
  ],
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

Polyfill.register({
  name: 'stringfromcodepoint',
  shortName: 'sfcp',
  url: '/mathiasbynens/String.fromCodePoint/master/fromcodepoint.js',
  repo: 'mathiasbynens/String.fromCodePoint',
  features: [
    'String.fromCodePoint()',
  ],
  sources: [
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint',
  ],
  browsers: {
    ff: 29
  }
})

Polyfill.register({
  name: 'stringprototypecodepointat',
  shortName: 'spcpa',
  url: '/mathiasbynens/String.prototype.codePointAt/master/codepointat.js',
  repo: 'mathiasbynens/String.prototype.codePointAt',
  features: [
    'String.prototype.codePointAt()',
  ],
  sources: [
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt'
  ],
  browsers: {
    ff: 29
  }
})

Polyfill.register({
  name: 'stringprototyperepeat',
  shortName: 'spr',
  url: '/mathiasbynens/String.prototype.repeat/master/repeat.js',
  repo: 'mathiasbynens/String.prototype.repeat',
  features: [
    'String.prototype.repeat()',
  ],
  sources: [
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat',
  ],
  browsers: {
    ff: 24,
    chrome: 36,
  }
})

Polyfill.register({
  name: 'stringprototypestartswith',
  shortName: 'spsw',
  url: '/mathiasbynens/String.prototype.startsWith/master/startswith.js',
  repo: 'mathiasbynens/String.prototype.startsWith',
  features: [
    'String.prototype.startsWith()',
  ],
  sources: [
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith',
  ],
  browsers: {
    ff: 17,
    chrome: 36,
  }
})

Polyfill.register({
  name: 'stringprototypeendswith',
  shortName: 'spew',
  url: '/mathiasbynens/String.prototype.endsWith/master/endswith.js',
  repo: 'mathiasbynens/String.prototype.endsWith',
  features: [
    'String.prototype.endsWith()',
  ],
  sources: [
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith',
  ],
  browsers: {
    ff: 17,
    chrome: 36,
  }
})

Polyfill.register({
  name: 'stringprototypecontains',
  shortName: 'spc',
  url: '/mathiasbynens/String.prototype.contains/master/contains.js',
  repo: 'mathiasbynens/String.prototype.contains',
  features: [
    'String.prototype.contains()',
  ],
  sources: [
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/contains',
  ],
  browsers: {
    ff: 18
  }
})

Polyfill.register({
  name: 'arrayfrom',
  shortName: 'afrom',
  url: '/mathiasbynens/Array.from/master/array-from.js',
  repo: 'mathiasbynens/Array.from',
  features: [
    'Array.from()',
  ],
  sources: [
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from',
  ],
  browsers: {
    ff: 32
  }
})

Polyfill.register({
  name: 'arrayof',
  shortName: 'aof',
  url: '/mathiasbynens/Array.of/master/array-of.js',
  repo: 'mathiasbynens/Array.of',
  features: [
    'Array.of()',
  ],
  sources: [
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of',
  ],
  browsers: {
    ff: 25
  }
})

Polyfill.register({
  name: 'arrayprototypefind',
  shortName: 'apf',
  url: '/paulmillr/Array.prototype.find/master/index.js',
  repo: 'paulmillr/Array.prototype.find',
  features: [
    'Array.prototype.find()',
  ],
  sources: [
    'http://kangax.github.io/compat-table/es6/',
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find',
  ],
  browsers: {
    ff: 25,
    safari: 7.1,
    ios: 8,
  }
})

Polyfill.register({
  name: 'arrayprototypefindindex',
  shortName: 'apfi',
  url: '/paulmillr/Array.prototype.findIndex/master/index.js',
  repo: 'paulmillr/Array.prototype.findIndex',
  features: [
    'Array.prototype.findIndex()',
  ],
  sources: [
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex',
  ],
  browsers: {
    ff: 25,
    safari: 7.1,
    ios: 8,
  }
})

Polyfill.register({
  name: 'regexpprototypesearch',
  shortName: 'reps',
  url: '/mathiasbynens/RegExp.prototype.search/master/regexp-prototype-search.js',
  repo: 'mathiasbynens/RegExp.prototype.search',
  features: [
    'RegExp.prototype.search()'
  ],
})

Polyfill.register({
  name: 'regexpprototypematch',
  shortName: 'repm',
  url: '/mathiasbynens/RegExp.prototype.match/master/regexp-prototype-match.js',
  repo: 'mathiasbynens/RegExp.prototype.match',
  features: [
    'RegExp.prototype.match()',
  ],
})

Polyfill.register({
  name: 'objectsetprototypeof',
  shortName: 'ospo',
  url: '/polyfills/Object.setPrototypeOf/master/index.js',
  repo: 'polyfills/Object.setPrototypeOf',
  features: [
    'Object.setPrototypeOf()',
  ],
  sources: [
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf#Browser_compatibility',
  ],
  browsers: {
    ff: 31,
    chrome: 34,
    opera: true,
  }
})

Polyfill.register({
  name: 'picture',
  shortName: 'pic',
  url: '/scottjehl/picturefill/master/dist/picturefill.js',
  repo: 'scottjehl/picturefill',
  features: [
    '<picture>',
  ],
  sources: [
    'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture',
  ],
})
