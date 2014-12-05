
var fs = require('fs')
var semver = require('semver')
var memo = require('memorizer')
var debug = require('debug')('polyfills-db:feature')

var agents = require('./agents')

module.exports = Feature

function Feature(options) {
  if (!(this instanceof Feature)) return new Feature(options)

  // the name of this feature
  this.name = options.name
  // a shortname for this feature
  this.shortName = options.shortName || options.name
  // the module associated with this feature
  this.moduleName = options.module
  // optional URL to download this file
  if (options.url) {
    this.url = options.url[0] === '/'
      ? 'https://raw.githubusercontent.com' + options.url
      : options.url
  }
  // github repo
  this.repo = options.repo
  // supersets
  this.supersets = options.supersets || []

  if (options.browsers) this.browsers = options.browsers
  else if (options.caniuse) this.browsers = Feature.caniuseToBrowsers(options.caniuse)
  if (options.filter) this.filter = options.filter
  else if (this.browsers) this.filter = agents.compile(this.browsers)
  if (options.runtime) this.runtimeFilename = options.runtime
}

// by default, a feature is always enabled
Feature.prototype.filter = function () {
  return true
}

// to do: REMOVE THIS
Feature.prototype.id = function () {
  return this.shortName
}

// lazily get the underlying module if any
memo(Feature.prototype, 'module', function () {
  return require(this.moduleName)
})

// get the version of the module
memo(Feature.prototype, 'version', function () {
  return require(this.moduleName + '/package.json').version
})

// get the runtime as a string
// should we keep this in memory!?
memo(Feature.prototype, 'runtime', function () {
  if (!this.runtimeFilename) return false
  var filename = require.resolve(this.runtimeFilename)
  return fs.readFileSync(filename, 'utf8')
})

Feature.caniuseToBrowsers = function (feature) {
  var json = require('caniuse-db/features-json/' + feature + '.json')
  var browsers = {}
  Object.keys(caniuseBrowsers).forEach(function (browser) {
    browsers[browser] = lowestOf(json.stats[caniuseBrowsers[browser]], browser, feature) || false
  })
  return browsers
}

var caniuseBrowsers = {
  ie: 'ie',
  ff: 'firefox',
  chrome: 'chrome',
  safari: 'safari',
  opera: 'opera',
  ios: 'ios_saf',
  android: 'android',
  iep: 'ie_mob',
  chm: 'and_chr',
  ffm: 'and_ff',
}

function lowestOf(obj, browser, feature) {
  // versions are listed in ascending order
  var versions = Object.keys(obj).filter(function (version) {
    if (~version.indexOf('-')) return true;
    return semver.validRange(version);
  }).sort(function (a, b) {
    return semver.compare(semverify(a), semverify(b))
  })

  debug('%s: %s - %o', feature, browser, versions)

  var out = null
  for (var i = 0; i < versions.length; i++) {
    var version = versions[i]
    if (!out && obj[version] === 'y') {
      out = version.split('-')[0] // versions are sometimes ranged
    } else if (out && obj[version] !== 'y') {
      // if a lower version supports something,
      // but a higher version does not,
      // we disable it. specifically,
      // performance.now() on iOS 8 -> 8.1
      // http://caniuse.com/#feat=nav-timing
      out = false
    }
  }

  debug('%s: %s - %s', feature, browser, out)

  return out
}

function semverify(x) {
  x = x.split('-')[0]
  while (!semver.valid(x)) x += '.0'
  return x
}
