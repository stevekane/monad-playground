'use strict'

const Interface = {
  unit(value) { 
    return new Right(value)
  }, 

  bindM(ma, fn) {
    if (ma instanceof Left) return new Left(ma.value)
    else                    return fn(ma.value)
  }, 
  
  fmap (fn, ma) {
    if (ma instanceof Left) return new Left(fn(ma.value))
    else                    return new Right(fn(ma.value))
  },

  toString() { 
    return ''
  }
}

function Right (value) {
  this.value = value
}
Right.prototype = Object.create(Interface)
Right.prototype.toString = () => `Right ${this.value}`

function Left (value) {
  this.value = value
}
Left.prototype = Object.create(Interface)
Left.prototype.toString = () => `Left ${this.value}`

module.exports = { Interface, Left, Right }
