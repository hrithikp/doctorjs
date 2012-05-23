/**
* pretty-data - nodejs plugin to pretty-print or minify data in XML, JSON and CSS formats.
*  
* Version - 0.30.3
* Copyright (c) 2012 Vadim Kiryukhin
* vkiryukhin @ gmail.com
* http://www.eslinstructor.net/pretty-data/
* 
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/

(function () {
  var shift = ['\n'];
  var step = '  ', // 2 spaces
      maxdeep = 100, // nesting level
      ix = 0;
  
  // initialize array with shifts //
  for(ix=0;ix<maxdeep;ix++){
    shift.push(shift[ix]+step); 
  }
  
  var jsonmin = function (text) {
    return text.replace(/\s{0,}\{\s{0,}/g,"{")
               .replace(/\s{0,}\[$/g,"[")
               .replace(/\[\s{0,}/g,"[")
               .replace(/:\s{0,}\[/g,':[')
               .replace(/\s{0,}\}\s{0,}/g,"}")
               .replace(/\s{0,}\]\s{0,}/g,"]")
               .replace(/\"\s{0,}\,/g,'",')
               .replace(/\,\s{0,}\"/g,',"')
               .replace(/\"\s{0,}:/g,'":')
               .replace(/:\s{0,}\"/g,':"')
               .replace(/:\s{0,}\[/g,':[')
               .replace(/\,\s{0,}\[/g,',[')
               .replace(/\,\s{2,}/g,', ')
               .replace(/\]\s{0,},\s{0,}\[/g,'],[');   
  }
  
  exports = function (text) {
    var ar = jsonmin(text).replace(/\{/g,"~::~{~::~")
                          .replace(/\[/g,"[~::~")
                          .replace(/\}/g,"~::~}")
                          .replace(/\]/g,"~::~]")
                          .replace(/\"\,/g,'",~::~')
                          .replace(/\,\"/g,',~::~"')
                          .replace(/\]\,/g,'],~::~')
                          .replace(/~::~\s{0,}~::~/g,"~::~")
                          .split('~::~'),
        len = ar.length,
        deep = 0,
        str = '',
        ix = 0;
    
    for(ix=0;ix<len;ix++) {
      if( /\{/.exec(ar[ix]))  { 
        str += shift[deep++]+ar[ix];
      } else 
      if( /\[/.exec(ar[ix]))  { 
        str += shift[deep++]+ar[ix];
      }  else 
      if( /\]/.exec(ar[ix]))  { 
        str += shift[--deep]+ar[ix];
      }  else 
      if( /\}/.exec(ar[ix]))  { 
        str += shift[--deep]+ar[ix];
      } else {
        str += shift[deep]+ar[ix];
      }
    }
    
    return str.replace(/^\n{1,}/,'');
  }  
})();