'use strict'

const test = require('tape')
const Maybe = require('../Maybe')
const bind = Maybe.bind
const unit = Maybe.unit
const Just = Maybe.Just
const Nothing = Maybe.Nothing
const add1 = (x) => x + 1

test('Maybe Just and Nothing constructors work as intended', (t) => {
  const n = new Nothing()
  const j = new Just(5)

  t.same(n.value, null)
  t.same(j.value, 5)
  t.end()
})

test('unit returns instance of Just w/ value set', (t) => {
  const u = Maybe.unit(5) 

  t.same(u.value, 5)
  t.true(u instanceof Just)
  t.end()
})

test('composition through bind works as expected', (t) => {
  const initial = new Just(1)
  const n = new Nothing()
  const result = bind(initial, add1)
  const stillNothing = bind(n, add1)
  const start = new Just(0)
  const end = bind(bind(bind(start, add1), add1), add1)

  t.same(result.value, 2)
  t.true(stillNothing instanceof Nothing)
  t.same(end.value, 3)
  t.end()
})

test('infix version of bind works as expected', (t) => {
  t.end()  
})
