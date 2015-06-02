'use strict'

const fs = require('fs')
const test = require('tape')
const sweet = require('sweet.js')
const Maybe = require('../../src/Maybe')
const Just = Maybe.Just
const Nothing = Maybe.Nothing
const doMacro = fs.readFileSync(__dirname + '/../../macros/do-block.js', 'utf-8')

function dot (prop) {
  return function (obj) {
    return obj[prop] ? Just(obj[prop]) : Nothing()
  }
}

function findWhere (list, hash) {
  let found, stillValid, i, key

  for (i = 0; i < list.length; i++) {
    stillValid = true
    for (key in hash) {
      if (list[i][key] !== hash[key]) {
        stillValid = false
        break
      }
    } 
    if (stillValid) {
      found = list[i]
      break
    }
  }
  return found ? Just(found) : Nothing()
}

const list = [
  {age: 5, first: 'Steve', last: 'Kane', id: 1}, 
  {age: 3, first: 'Bob', last: 'Swanson', id: 2}
]

const props = {age: 5}

const compileOptions = {
  modules: sweet.loadModule(doMacro),
  readableNames: true
}

const src = `
  DO {
    let x = 5, y = 6
    person <- findWhere(list, props)
    id <- dot('id')(person)
    age <- dot('age')(person)
    Maybe.returnM(id + age + 1)
  }
`

const src2 = `
  DO {
    findWhere(list, props)
    dot('id')
    let bumper = 1
    function (id) { return Maybe.returnM(id + bumper + 1) }
  }
`

const src3 = `
  DO {
    findWhere(list, props) 
  }
`

const mixSrc = `
  findWhere(list, props)
  .bindM(dot('id'))
  .bindM(function (id) { return Maybe.returnM(id) })
`

const code = sweet.compile(src, compileOptions).code
const code2 = sweet.compile(src2, compileOptions).code
const code3 = sweet.compile(src3, compileOptions).code

console.log(code)
console.log(code2)
console.log(code3)
//console.log(eval(mixSrc))
console.log(eval(code))
console.log(eval(code2))


//test('do block expansion produces the appropriate output', function (t) {
//  const doSrc = `
//    DO {
//      person <- findWhere(list, props)
//      id <- dot('id')(person)
//      Maybe.returnM(id + 1)
//    }`
//  const expectedSrc = `
//    findWhere(list, props).bindM(function (person) {
//      return dot('id')(person).bindM(function (id) {
//        return Maybe.returnM(id + 1); 
//      }); 
//    }); 
//  `
//  const xformedSrc = sweet.compile(doSrc, compileOptions).code
//  const macroResult = eval(xformedSrc)
//  const expectedResult = eval(expectedSrc)
//
//  t.deepLooseEqual(macroResult, expectedResult)
//  t.true(macroResult instanceof Just)
//  t.true(expectedResult instanceof Just)
//  t.end()
//})
