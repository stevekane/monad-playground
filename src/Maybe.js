'use strict'

function Just (value) {
  return Object.setPrototypeOf({value}, Just.prototype)
}
Just.prototype.toString = () => `Just ${this.value}`
Just.prototype.bindM = (fn) => fn(this.value)
Just.prototype.fmap = (fn) => Just(fn(ma.value))
Just.prototype.returnM = (value) => Just(value)

function Nothing () {
  return Object.setPrototypeOf({}, Nothing.prototype)
}
Nothing.prototype.toString = () => 'Nothing'
Nothing.prototype.bindM = (fn) => Nothing()
Nothing.prototype.fmap = (fn) => Nothing()
Nothing.prototype.returnM = (value) => Just(value)

module.exports = {
  Just,
  Nothing,
  returnM: (value) => Just(value),
  bindM: (ma, fn) => ma instanceof Just ? fn(ma.value) : Nothing(),
  fmap: (fn, ma) => ma instanceof Just ? Just(fn(ma.value)) : Nothing(),
}
