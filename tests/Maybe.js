'use strict'

const test = require('tape')
const Maybe = require('../src/Maybe')
const bindM = Maybe.bindM
const returnM = Maybe.returnM
const Just = Maybe.Just
const Nothing = Maybe.Nothing
const add1 = (x) => x + 1

test('Maybe Just and Nothing constructors work as intended', (t) => {
  const n = Nothing()
  const j = Just(5)

  t.same(n.value, undefined) //kind of weird test as Nothing defines no property at all..
  t.same(j.value, 5)
  t.end()
})

test('returnM returns instance of Just w/ value set', (t) => {
  const u = Maybe.returnM(5) 

  t.same(u.value, 5)
  t.true(u instanceof Just)
  t.end()
})
