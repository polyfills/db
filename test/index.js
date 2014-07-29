
var assert = require('assert')
var ua = require('useragent')

require('useragent/features')

var db = require('..')

// http://www.useragentstring.com/pages/Firefox/
var chrome36 = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1944.0 Safari/537.36'
var ie8 = 'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.2; Trident/4.0; Media Center PC 4.0; SLCC1; .NET CLR 3.0.04320)'
var ios51 = 'Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3'
var android403 = 'Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30'
var ff31 = 'Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0'

describe('Recast', function () {
  describe('Generators', function () {
    it('.filter(Chrome 36)', function () {
      var agent = ua.parse(chrome36)
      var regenerator = db.recast.transform.generators
      assert(regenerator.filter(agent))
    })

    it('.filter(Firefox 31)', function () {
      var agent = ua.parse(ff31)
      var regenerator = db.recast.transform.generators
      assert(!regenerator.filter(agent))
    })
  })

  describe('Arrow Functions', function () {
    it('.detect()', function () {
      var arrow = db.recast.transform.arrowfn
      assert(arrow.detect('[].map( x => 2 * x)'))
      assert(arrow.detect('[].map( (x, y) => x * y)'))
    })
  })
})

describe('Polyfills', function () {
  describe('ES5', function () {
    it('.filter(IE 8)', function () {
      var agent = ua.parse(ie8)
      var es5 = db.polyfills.polyfill.es5
      assert(es5.filter(agent))
    })
  })

  describe('requestAnimationFrame', function () {
    it('.filter(iOS 5.1)', function () {
      var agent = ua.parse(ios51)
      var raf = db.polyfills.polyfill.raf
      assert(raf.filter(agent))
    })

    it('.filter(Android 4.0.3)', function () {
      var agent = ua.parse(android403)
      var raf = db.polyfills.polyfill.raf
      assert(raf.filter(agent))
    })
  })
})
