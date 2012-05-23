var example = "var ie  = document.all != null;  //ie4 and above"

print(arguments)
load('require.js')


var tags = require('jsctags/ctags/index').Tags,
    prettify = require('prettify')
    
tags = new tags();

tags.scan(example)

print(prettify(JSON.stringify(tags)))
print()