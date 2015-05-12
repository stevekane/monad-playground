'use strict'

class Future {
  constructor(value) {
    this.value = null
    this.readys = []
    this.fails = []
    this.resolved = false
    if (value != null) this.complete(value)
  }

  complete(value) {
    const _this = this

    if (this.resolved) return
    this.resolved = true

    process.nextTick(function () { 
      for (let i = 0; i < _this.readys.length; i++) {
        _this.readys[i](value)
        _this.value = value 
      }
    })
  }

  reject(value) {
    const _this = this

    if (this.resolved) return
    this.resolved = true

    process.nextTick(function () { 
      for (let i = 0; i < _this.fails.length; i++) {
        _this.fails[i](value)
        _this.value = value
      }
    })
  }

  ready(cb) {
    this.readys.push(cb) 
  }

  fail(cb) {
    this.fails.push(cb) 
  }

  static bind () {
    console.log("yo") 
  }
}

module.exports = Future

