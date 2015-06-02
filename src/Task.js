'use strict'

function Task (fork) {
  return Object.setPrototypeOf({fork}, Task.prototype)
}
Task.prototype.toString = () => `Task of ${this.fork.name || 'Anonymous'}`
Task.prototype.bindM = (fn) => {
  const ma = this

  return Task(function (resolveOuter) {
    return ma.fork(function (resolveInner) {
      return fn(resolveInner).fork(resolveOuter)
    }); 
  })
}
Task.prototype.fmap = (fn) => {
  return this.fork(function (val) {
    return Task(fn(val)) 
  })
}
Task.prototype.returnM = returnM

function returnM (value) {
  return Task(function baseResolve (resolve) {
    setTimeout(resolve, 1, value)
  })
}

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
