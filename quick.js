'use strict'

const log = (x) => console.log(x.toString())
const Maybe = require('./src/Maybe')
const Either = require('./src/Either')
const Just = Maybe.Just
const Nothing = Maybe.Nothing
const Left = Either.Left
const Right = Either.Right

function add1 (x) { return x + 1 }

function dot (prop) {
  return (obj) => obj[prop] 
    ? new Just(obj[prop]) 
    : new Nothing
}

// findWhere (Object a) :: [a] -> Object -> Maybe a
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
  return found 
    ? new Just(found) 
    : new Nothing
}

const list = [{age: 5, id: 1}, {age: 3, id: 2}]

const props = {age: 5}

const moreProps = {age: 4}

const match = findWhere(list, props)

const possibleMatch = findWhere(list, moreProps)

//expanded, 
const expanded = Maybe.Interface.bindM(
                   Maybe.Interface.bindM(
                     findWhere(list, props), 
                     dot('id')
                   ),
                   Maybe.Interface.unit $$ add1
                 )

const withoutClosure = findWhere(list, props) >>= 
                    dot('id') >>=
                    Maybe.Interface.unit $$ add1

const withClosure = findWhere(list, props) >>= 
                 ((x) => dot('id')(x) >>= 
                   ((id) => Maybe.Interface.unit(id + 1))
                 )

//var withDo = DO { 
//  x <- findWhere(list, props)
//  id <- dot('id')(x)
//}


log(expanded)
log(withoutClosure)
log(withClosure)
log(match)
log(possibleMatch)

