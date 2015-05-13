'use strict'

// bind :: m a -> (a -> m b) -> m b
function unit (value) { return new Just(value) }
function bind (ma, fn) {
  if (ma instanceof Just) return new Just(fn(ma.value))
  else                    return new Nothing
}
function fmap (fn, ma) { 
  if (ma instanceof Just) return new Just(fn(ma.value))
  else                    return new Nothing
}

function Just (value) {
  this.value = value
}

Just.prototype.unit = unit
Just.prototype.bind = bind
Just.prototype.fmap = fmap

function Nothing () {}

Nothing.prototype.unit = unit
Nothing.prototype.bind = bind
Nothing.prototype.fmap = fmap

module.exports = { Just, Nothing, unit, bind }