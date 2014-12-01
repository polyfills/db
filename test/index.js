
var strip = require('strip-comments')
var request = require('request')
var assert = require('assert')
var ua = require('useragent')
var fs = require('fs')

var db = require('..')

// http://www.useragentstring.com/pages/Firefox/
var chrome36 = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1944.0 Safari/537.36'
var ie8 = 'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.2; Trident/4.0; Media Center PC 4.0; SLCC1; .NET CLR 3.0.04320)'
var ios51 = 'Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3'
var android403 = 'Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30'
var ff31 = 'Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0'
var safari7 = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.77.4 (KHTML, like Gecko) Version/7.0.5 Safari/537.77.4'
var opera1214 = 'Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14'
var ios81 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B411 Safari/600.1.4'
var ios8 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B411 Safari/600.1.4'
var ie11 = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko'

describe('Agents', function () {
  describe('.parse()', function () {
    it('should support falsey', function () {
      var agents = db.agents.parse(null)
      assert.equal(1, agents.length)
      var agent = agents.shift()
      assert(/unknown/i.test(agent.family))
    })

    it('useragent strings', function () {
      var agents = db.agents.parse(chrome36)
      assert.equal(1, agents.length)
      var agent = agents.shift()
      assert(agent.family.match(/\bchrome\b/i))
      assert.equal('36', agent.major)
    })

    it('objects', function () {
      var agents = db.agents.parse({
        family: 'chrome',
        major: 36
      })
      assert.equal(1, agents.length)
      var agent = agents.shift()
      assert(agent.family.match(/\bchrome\b/i))
      assert.equal('36', agent.major)
    })

    it('arrays', function () {
      var agents = db.agents.parse([
        chrome36,
        {
          family: 'chrome',
          major: 26
        }
      ])
      assert.equal(2, agents.length)
      var agent = agents.shift()
      assert(agent.family.match(/\bchrome\b/i))
      assert.equal('36', agent.major)
      var agent = agents.shift()
      assert(agent.family.match(/\bchrome\b/i))
      assert.equal(26, agent.major)
    })
  })

  describe('.compile()', function () {
    it('should favor ios over safari', function () {
      var fn = db.agents.compile({
        ios: 7,
        safari: 6
      })
      assert(!fn({
        family: 'mobile safari',
        major: 7
      }))

      assert(fn({
        family: 'mobile safari',
        major: 6
      }))

      assert(!fn({
        family: 'safari',
        major: 7
      }))

      assert(!fn({
        family: 'safari',
        major: 6
      }))

      assert(fn({
        family: 'safari',
        major: 5
      }))
    })
  })

  describe('.filter()', function () {
    it('should pass if any agents satisfy', function () {
      var transforms = [db.recast.transform.generators]
      var agents = [{
        family: 'firefox',
        major: 27 // after generators
      }, {
        family: 'firefox',
        major: 25 // before generators
      }]
      assert(db.agents.filter(transforms, agents))
    })

    it('should include any transforms where .filter does not exist', function () {
      var transforms = [{}]
      var agents = [{
        family: 'firefox',
        major: 27
      }]
      assert.deepEqual(transforms, db.agents.filter(transforms, agents))
    })
  })
})

describe('Features', function () {
  it('should have .id()', function () {
    var feature = db.recast.transform.generators
    assert.equal('gens', feature.id())
  })

  it('should support .version', function () {
    var feature = db.recast.transform.generators
    assert.equal(require('regenerator/package.json').version, feature.version)
  })
})

describe('Recast', function () {
  it('should include all modules as development dependencies', function () {
    db.recast.transforms.forEach(function (transform) {
      assert(transform.module)
    })
  })

  describe('Generators', function () {
    it('.filter(Chrome 36)', function () {
      var agent = db.agents.parse(chrome36)[0]
      var regenerator = db.recast.transform.generators
      assert(regenerator.filter(agent))
    })

    it('.filter(Firefox 31)', function () {
      var agent = db.agents.parse(ff31)[0]
      var regenerator = db.recast.transform.generators
      assert(!regenerator.filter(agent))
    })

    it('.runtime', function () {
      var regenerator = db.recast.transform.generators
      var runtime = regenerator.runtime
      new Function(runtime)
    })
  })

  describe('Async Functions', function () {
    it('.runtime', function () {
      var asyncFn = db.recast.transform.async
      var runtime = asyncFn.runtime
      new Function(runtime)
    })
  })
})

describe('PostCSS', function () {
  it('should include all modules as development dependencies', function () {
    db.postcss.transforms.forEach(function (transform) {
      assert(transform.module)
    })
  })

  describe('calc()', function () {
    it('.filter(Chrome 36)', function () {
      var agent = db.agents.parse(chrome36)[0]
      var calc = db.postcss.transform.calc
      assert(!calc.filter(agent))
    })

    it('.filter(IE8)', function () {
      var agent = db.agents.parse(ie8)[0]
      var calc = db.postcss.transform.calc
      assert(calc.browsers.safari === '6.1')
      assert(calc.browsers.ios === '7.0')
      assert(calc.browsers.ie === '10')
      assert(calc.filter(agent))
    })
  })

  describe('var()', function () {
    it('.filter(Firefox 31)', function () {
      var agent = db.agents.parse(ff31)[0]
      var vars = db.postcss.transform.variables
      assert(!vars.filter(agent))
    })

    it('.filter(Chrome 36)', function () {
      var agent = db.agents.parse(chrome36)[0]
      var vars = db.postcss.transform.variables
      assert(vars.filter(agent))
    })
  })
})

describe('Polyfills', function () {
  describe('ES5', function () {
    it('.filter(IE 8)', function () {
      var agent = db.agents.parse(ie8)[0]
      var es5 = db.polyfills.polyfill.es5
      assert(es5.filter(agent))
    })
  })

  describe('requestAnimationFrame', function () {
    it('.filter(iOS 5.1)', function () {
      var agent = db.agents.parse(ios51)[0]
      var raf = db.polyfills.polyfill.raf
      assert(raf.filter(agent))
    })

    it('.filter(Android 4.0.3)', function () {
      var agent = db.agents.parse(android403)[0]
      var raf = db.polyfills.polyfill.raf
      assert(raf.filter(agent))
    })
  })

  describe('EventSource', function () {
    it('.filter(iOS 5.1)', function () {
      var agent = db.agents.parse(ios51)[0]
      var raf = db.polyfills.polyfill.eventsource
      assert(!raf.filter(agent))
    })

    it('.filter(IE 8)', function () {
      var agent = db.agents.parse(ie8)[0]
      var es5 = db.polyfills.polyfill.eventsource
      assert(es5.filter(agent))
    })

    it('.filter(IE 11)', function () {
      var agent = db.agents.parse(ie11)[0]
      var es5 = db.polyfills.polyfill.eventsource
      assert(es5.filter(agent))
    })
  })

  describe('objectobserve', function () {
    it('above setimmediate', function () {
      var oidx = db.polyfills.polyfills.indexOf(db.polyfills.polyfill.obs)
      var sidx = db.polyfills.polyfills.indexOf(db.polyfills.polyfill.si)
      assert(~oidx && ~sidx && oidx < sidx)
    })
  })

  describe('Object.setPrototypeOf', function () {
    it('.filter(Opera 12.14)', function () {
      var agent = db.agents.parse(opera1214)[0]
      var protoof = db.polyfills.polyfill.ospo
      assert(protoof.filter(agent))
    })
  })

  describe('performance.now()', function () {
    var polyfill = db.polyfills.polyfill.pnow

    it('.filter(ios8)', function () {
      var agent = db.agents.parse(ios8)[0]
      assert(polyfill.filter(agent))
    })

    it('.filter(ios8.1)', function () {
      var agent = db.agents.parse(ios81)[0]
      assert(polyfill.filter(agent))
    })
  })

  describe('URLs should 200', function () {
    db.polyfills.polyfills.forEach(function (polyfill) {
      it(polyfill.name, function (done) {
        request(polyfill.url, function (err, res) {
          if (err) throw err
          assert.equal(res.statusCode, 200)
          done()
        })
      })
    })
  })
})
