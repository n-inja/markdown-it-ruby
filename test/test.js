'use strict'

const MarkdownIt = require('markdown-it')
const md = new MarkdownIt()
const assert = require('assert')
const ruby = require('../')

md.use(ruby)

describe('test', function() {
  it('ok', function() {
    const s = '{漢字}(かんじ)'
    const expected = '<p><ruby>漢字<rt>かんじ</rt></ruby></p>\n'
    const actual = md.render(s)
    assert.equal(expected, actual)
  })
  it('ok', function() {
    const s = '{s1}({s2}(s3))'
    const expected = '<p><ruby>s1<rt><ruby>s2<rt>s3</rt></ruby></rt></ruby></p>\n'
    const actual = md.render(s)
    assert.equal(expected, actual)
  })
})
