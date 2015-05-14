'use strict'

const Interface = {
  unit(value) {
    return new Just(value)
  },

  bindM(ma, fn) {
    if (ma instanceof Just) return fn(ma.value)
    else                    return new Nothing
  },

  fmap(fn, ma) {
    if (ma instanceof Just) return new Just(fn(ma.value))
    else                    return new Nothing
  },

  toString() { 
    return ''
  }
}

function Just (value) {
  this.value = value
}
Just.prototype = Object.create(Interface)
Just.prototype.toString = () => `Just ${this.value}`

function Nothing () {}
Nothing.prototype = Object.create(Interface)
Nothing.prototype.toString = () => 'Nothing'

module.exports = { Interface, Just, Nothing }
