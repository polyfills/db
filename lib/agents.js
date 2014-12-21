
var ua = require('useragent')
var satisfies = require('semver').satisfies

/**
 * Agents must either be:
 *   - A useragent string.
 *   - An object of the form {family, major, minor, patch} to match UA
 *
 * A single object is always returned
 */

exports.parse = function (obj) {
  if (!obj) return { family: 'Unknown' }
  if (typeof obj === 'string') return ua.lookup(obj)
  if ('family' in obj && 'major' in obj) return obj // already an object
  throw new TypeError('unknown obj: ' + obj)
}

// filter a list of transforms against a list of agents
exports.filter = function (transforms, agent) {
  transforms = transforms.filter(function (transform) {
    return !transform.filter // if .filter does not exist, it is assumed to be true
      || transform.filter(agent)
  })
  // remove supersets
  top:
  for (var i = 0; i < transforms.length; i++) {
    var transform = transforms[i]
    var supersets = transform.supersets
    if (!supersets || !supersets.length) continue
    for (var j = 0; j < supersets.length; j++) {
      var superset = supersets[j]
      for (var k = 0; k < transforms.length; k++) {
        if (transforms[k].name !== superset) continue
        transforms.splice(i--, 1)
        continue top
      }
    }
  }
  return transforms
}

// build a filter function from an object of browsers
// order matters! should go from more specific to less specific
// we also include aliases for custom objects
// btw we need more
var families = {
  // mobile
  ios: /\b(ios|mobile safari)\b/i,
  ffm: /\b(ff mobile|ffm|firefox mobile)\b/i,
  iep: /\b(ie phone|iep|internet explorer phone|windows phone)\b/i,
  chm: /\b(chrome mobile)\b/i,
  opm: /\b(opera mini)\b/i,
  android: /\bandroid\b/i,

  // desktop, etc.
  ie: /\b(ie|internet explorer)\b/i,
  ff: /\b(ff|firefox)\b/i,
  chrome: /\b(chrome|chromium)\b/i,
  safari: /\bsafari\b/i,
  opera: /\b(op|opera)\b/i,
}

// each filter only tests for a single agent
exports.compile = function (browsers) {
  var str = 'var family = agent.family\n'
    + 'var version = agent.version = agent.version '
    +  '|| [agent.major || 0, agent.minor || 0, agent.patch || 0].join(".")\n'
  Object.keys(families).forEach(function (name) {
    var version = browsers[name]
    if (version == null) return
    if (version === true) return str += 'if (families.' + name + '.test(family)) return false\n'
    if (version === false) return str += 'if (families.' + name + '.test(family)) return true\n'
    str += 'if (families.' + name + '.test(family)) '
      + 'return satisfies(version, ' + JSON.stringify('<' + version) + ')\n'
  })
  str += 'return ' + String(browsers.default !== false)
  return eval('(function filter(agent) {\n' + str + '\n})')
}
