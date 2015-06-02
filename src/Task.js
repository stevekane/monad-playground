'use strict'

function Task (fork) {
  return Object.setPrototypeOf({fork}, Task.prototype)
}
Task.prototype.toString = () => `Task of ${this.fork.name}`
Task.prototype.bindM = (fn) => {
  const ma = this

  return Task(function (resolveOuter) {
    return ma.fork(function (resolveInner) {
      return fn(resolveInner).fork(resolveOuter)
    }); 
  })
}
Task.prototype.fmap = (fn) => {
  const ma = this
  const resolve = function (val) {
    return Task(fn(val))
  }
  return ma.fork(resolve)
}
function returnM (value) {
  return Task(function baseResolve (resolve) {
    setTimeout(resolve, 1, value)
  })
}
Task.prototype.returnM = returnM

module.exports = {
  Task,
  returnM,
  bindM: (ma, fn) => {
    return Task(function (resolveOuter) {
      return ma.fork(function (resolveInner) {
        return fn(resolveInner).fork(resolveOuter)
      })
    })
  },
  fmap: (fn, ma) => {
    return Task(function (resolveOuter) {
      return ma.fork(function (resolveInner) {
        return resolveOuter(fn(resolveInner))
      })
    })
  }
}
