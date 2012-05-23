var exports = {}

function require (path) {
  exports = {}
  var tmp 
  load(path + '.js')
  tmp = exports
  exports = {}
  return tmp
}