'use strict'

function unit (value) { return new Right(value) }
function bind (ma, fn) {
  if (ma instanceof Left) return new Left(ma.value)
  else                    return fn(ma.value)
}
function fmap (fn, ma) {
  if (ma instanceof Left) return new Left(fn(ma.value))
  else                    return new Right(fn(ma.value))
}

function Right (value) {
  this.value = value
}
Right.prototype.unit = unit
Right.prototype.bind = bind
Right.prototype.fmap = fmap
Right.prototype.toString = () => "Right " + JSON.stringify(this.value)

function Left (value) {
  this.value = value
}
Left.prototype.unit = unit
Left.prototype.bind = bind
Left.prototype.fmap = fmap
Left.prototype.toString = () => "Left " + JSON.stringify(this.value)

module.exports = { Left, Right, unit, bind, fmap }
