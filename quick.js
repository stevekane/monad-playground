'use strict'

const log = (x) => console.log(x.toString())
const Maybe = require('./src/Maybe')
const Either = require('./src/Either')
const Just = Maybe.Just
const Nothing = Maybe.Nothing
const Left = Either.Left
const Right = Either.Right

const add1 = (x) => new Just(x + 1)

function dot (prop) {
  return (obj) => obj[prop] ? new Just(obj[prop]) : new Nothing
}

// findWhere (Object a) :: [a] -> Object -> Maybe a
function findWhere (list, hash) {
  var keys = Object.keys(hash)
  var stillValid = true

  for (var i = 0; i < list.length; i++) {
    stillValid = true
    for (var j = 0; j < keys.length; j++) {
      if (list[i][keys[j]] !== hash[keys[j]]) {
        stillValid = false
        break
      }
    } 
    if (stillValid) return new Just(list[i])
  }
  return new Nothing
}

const list = [{age: 5, id: 1}, {age: 3, id: 2}]

const result = Maybe.Interface.unit(1) >>= 
               add1 >>= 
               add1

const match = findWhere(list, {age: 5})

const possibleMatch = findWhere(list, {age: 4})

const idForTarget = findWhere(list, {age: 5}) >>= 
                    dot('id')


log(idForTarget)
log(match)
log(possibleMatch)
log(result)

DO { 
  x <- findWhere(list, {age: 5})
  id <- dot('id')(x)
  Maybe.Interface.bind(id)
}
