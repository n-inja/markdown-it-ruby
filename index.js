'use strict'

module.exports = function(md) {
  md.inline.ruler.push('ruby', ruby)
}

const LBRACE = '{'.charCodeAt(0)
const RBRACE = '}'.charCodeAt(0)
const LPAREN = '('.charCodeAt(0)
const RPAREN = ')'.charCodeAt(0)
const BSLASH = '\\'.charCodeAt(0)

// parse {hoge}(huga) -> <ruby>hoge<rt><huga/rt></ruby>
function ruby (state, silent) {
  const max = state.posMax

  // parse {hoge}(huga)
  //       ~~~~~~
  if (state.src.charCodeAt(state.pos) !== LBRACE) {
    return false
  }
  const braceStart = state.pos
  const braceEnd = findCorresponds(state, braceStart, LBRACE, RBRACE)
  if (braceEnd < 0) {
    return false
  }

  // parse {hoge}(huga)
  //             ~~~~~~
  const parenStart = braceEnd + 1
  if (state.src.charCodeAt(parenStart) !== LPAREN) {
    return false
  }
  const parenEnd = findCorresponds(state, parenStart, LPAREN, RPAREN)

  if (parenEnd < 0) {
    return false
  }

  if (silent) {
    state.pos = parenEnd + 1
    return true
  }

  state.push('ruby_open', 'ruby', 1)

  // call tokenizer {hoge}(huga)
  //                 ~~~~
  state.pos = braceStart + 1
  state.posMax = braceEnd
  state.md.inline.tokenize(state)

  state.push('rt_open', 'rt', 1)

  // call tokenizer {hoge}(huga)
  //                       ~~~~
  state.pos = parenStart + 1
  state.posMax = parenEnd
  state.md.inline.tokenize(state)

  state.push('rt_close', 'rt', -1)
  state.push('ruby_close', 'ruby', -1)

  state.pos = parenEnd + 1
  state.posMax = max

  return true
}

function findCorresponds(state, pos, LCODE, RCODE) {
  let level = 0
  let endPos = -1

  while(pos < state.posMax) {
    const code = state.src.charCodeAt(pos)
    if (code === BSLASH) {
      pos += 2
      continue
    }
    if (code === RCODE) {
      level--
      if (level === 0) {
        endPos = pos
        break
      }
    }
    if (code === LCODE) {
      level++
    }
    pos++
  }
  return endPos
}
