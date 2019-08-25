# markdown-it-ruby
add ruby syntax to markdown-it

## Usage

```javascript
const md = require('markdown-it')
const ruby = require('markdown-it-ruby')

md.use(ruby)

md.render('{漢字}(かんじ)')
// '<p><ruby>漢字<rt>かんじ</rt></ruby></p>'

md.render('{s1}({s2}(s3))')
// '<p><ruby>s1<rt><ruby>s2<rt>s3</rt></ruby></rt></ruby></p>\n'
```
