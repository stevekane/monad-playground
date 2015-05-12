'use strict'

const test = require('tape')
const Future = require('../Future')

function matches (t, ref) { 
  return function (val) { 
    return t.same(ref, val) 
  }
}

test('Future fulfilled async when value provided', (t) => {
  const notYet = new Future
  const fulfilled = new Future('booo')
  const toReject = new Future

  t.plan(6)

  //never fulfill synchronously
  t.same(notYet.value, null)
  t.same(fulfilled.value, null)
  t.same(toReject.value, null)

  toReject.reject('infinite sadness')
  notYet.complete('wahh')
  notYet.ready(matches(t, 'wahh'))
  fulfilled.ready(matches(t, 'booo'))
  toReject.fail(matches(t, 'infinite sadness'))
})

test('Future calls multiple ready or error functions', (t) => {
  const toFulfill = new Future
  const toReject = new Future

  t.plan(4)
  toFulfill.complete('wahh')
  toReject.reject('nope')

  toFulfill.ready(matches(t, 'wahh'))
  toFulfill.ready(matches(t, 'wahh'))
  toReject.fail(matches(t, 'nope'))
  toReject.fail(matches(t, 'nope'))
})

test('Future bind returns correct type', (t) => {
  t.end()
})
