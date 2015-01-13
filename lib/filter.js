
// filter a list of transforms against a list of agents
module.exports = function (transforms, agent) {
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
