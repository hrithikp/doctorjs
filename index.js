//jsc index.js -- "$(cat example.js)"

load('require.js')

var tags = require('jsctags/ctags/index').Tags,
    prettify = require('prettify')
    
tags = new tags();

tags.scan(arguments[0])

print(JSON.stringify(tags))