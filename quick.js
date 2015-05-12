'use strict'

const Maybe = require('./src/Maybe')
const bind = Maybe.bind
const unit = Maybe.unit
const Just = Maybe.Just
const Nothing = Maybe.Nothing

const add1 = (x) => x + 1

const result = unit(1) >>= add1 >>= add1

console.log(result)
