'use strict'

const MarkdownIt = require('markdown-it')
const md = new MarkdownIt()
const assert = require('assert')
const ruby = require('../')

md.use(ruby)

describe('test', function() {
  it('ok', function() {
    const s = '{漢字}(かんじ)'
    assert.equal('<p><ruby>漢字<rt>かんじ</rt></ruby></p>\n', md.render(s))
  })
  it('ok', function() {
    const s = '{s1}({s2}(s3))'
    assert.equal('<p><ruby>s1<rt><ruby>s2<rt>s3</rt></ruby></rt></ruby></p>\n', md.render(s))
  })
})
