'use strict'

const log = (x) => console.log(x.toString())
const Maybe = require('./src/Maybe')
const Either = require('./src/Either')
const Just = Maybe.Just
const Nothing = Maybe.Nothing
const Left = Either.Left
const Right = Either.Right

const add1 = (x) => new Just(x + 1)
const getError = (x) => new Left('things went south')
const safeIterate = (x) => new Right(x + 1)

// findWhere (Object a) :: [a] -> Object -> Either null a
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
    if (stillValid) return new Right(list[i])
  }
  return new Left(null)
}

const list = [{age: 5, id: 1}, {age: 3, id: 2}]

const result = Maybe.Interface.unit(1) >>= add1 >>= add1

const possible = Either.Interface.unit(5) >>= 
                 getError >>= 
                 safeIterate 
const forSure = Either.Interface.unit(3) >>=
                safeIterate >>=
                safeIterate >>=
                safeIterate

const match = findWhere(list, {age: 5})
const possibleMatch = findWhere(list, {age: 4})

log(match)
log(possibleMatch)
log(result)
log(possible)
log(forSure)
