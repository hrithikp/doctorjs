var exports = {}

function require (path) {
  exports = {}
  var tmp 
      
  //print('requiring ' + path)
  load(path + '.js')
  //print('loaded ' + path)
  
  tmp = exports
  exports = {}
  return tmp
}