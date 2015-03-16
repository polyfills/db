'use strict'

const request = require('request')
const ua = require('polyfill-ua')
const assert = require('assert')

const db = require('..')

// http://www.useragentstring.com/pages/Firefox/
const chrome36 = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1944.0 Safari/537.36'
const ie8 = 'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.2; Trident/4.0; Media Center PC 4.0; SLCC1; .NET CLR 3.0.04320)'
const ios51 = 'Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3'
const android403 = 'Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30'
const ff31 = 'Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0'
const safari7 = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.77.4 (KHTML, like Gecko) Version/7.0.5 Safari/537.77.4'
const opera1214 = 'Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14'
const ios81 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B411 Safari/600.1.4'
const ios8 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B411 Safari/600.1.4'
const ie11 = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko'

describe('Polyfills', function () {
  describe('requestAnimationFrame', function () {
    it('.filter(iOS 5.1)', function () {
      let agent = ua.parse(ios51)
      let raf = db.polyfill.raf
      assert(raf.filter(agent))
    })

    it('.filter(Android 4.0.3)', function () {
      let agent = ua.parse(android403)
      let raf = db.polyfill.raf
      assert(raf.filter(agent))
    })
  })

  describe('EventSource', function () {
    it('.filter(iOS 5.1)', function () {
      let agent = ua.parse(ios51)
      let raf = db.polyfill.eventsource
      assert(!raf.filter(agent))
    })
  })

  describe('objectobserve', function () {
    it('above setimmediate', function () {
      let oidx = db.polyfills.indexOf(db.polyfill.obs)
      let sidx = db.polyfills.indexOf(db.polyfill.si)
      assert(~oidx && ~sidx && oidx < sidx)
    })
  })

  describe('Object.setPrototypeOf', function () {
    it('.filter(Opera 12.14)', function () {
      let agent = ua.parse(opera1214)
      let protoof = db.polyfill.ospo
      assert(protoof.filter(agent))
    })
  })

  describe('performance.now()', function () {
    let polyfill = db.polyfill.pnow

    it('.filter(ios8)', function () {
      let agent = ua.parse(ios8)
      assert(polyfill.filter(agent))
    })

    it('.filter(ios8.1)', function () {
      let agent = ua.parse(ios81)
      assert(polyfill.filter(agent))
    })
  })

  describe('URLs should 200', function () {
    db.polyfills.forEach(function (polyfill) {
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
