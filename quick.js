'use strict'

const Maybe = require('./src/Maybe')
const Just = Maybe.Just
const Nothing = Maybe.Nothing

function log (x) { console.log(x.toString()) }

function add1 (x) { return x + 1 }

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
  return found 
    ? Just(found) 
    : Nothing()
}

const getId = dot('id')

const list = [
  {age: 5, first: 'Steve', last: 'Kane', id: 1}, 
  {age: 3, first: 'Bob', last: 'Swanson', id: 2}
]

const props = {age: 5}

const moreProps = {age: 4}

const prefixWithoutClosure = 
  Maybe.bindM(
    Maybe.bindM(
      findWhere(list, props), 
      dot('id')
    ),
    Maybe.returnM $$ add1
  )

const withoutClosure = 
  findWhere(list, props) >>= 
  getId >>=
  Maybe.returnM $$ add1

const withClosure = 
  findWhere(list, props) >>= 
  ((x) => dot('id')(x) >>= 
    ((id) => Maybe.returnM(id + 1))
  )

const prefixClosure = 
  Maybe.bindM(findWhere(list, props), ((x) => {
    return Maybe.bindM(dot('id')(x), ((id) => {
      return Maybe.returnM(id + 1)
    }))
  }))

const withDoRaw = findWhere(list, props).bindM((person) => {
  return dot('id')(person).bindM((id) => {
    return Maybe.returnM(id + 1);
  });
})

const withDo = DO {
  person <= findWhere(list, props)
  id <= dot('id')(person)
  Maybe.returnM(id + 1)
}

const shouldBeNothing = 
  findWhere(list, moreProps) >>=
  getId >>=
  Maybe.returnM $$ add1

const shouldBeNothingWithDo = DO {
  person <= findWhere(list, moreProps)
  id <= dot('id')(person)
  Maybe.returnM(id + 1)
}

const possibleFullName = DO {
  person <= findWhere(list, props)
  first <= dot('first')(person)
  last <= dot('last')(person)
  var title = 'Mr.'
  var wholeName = title + ' ' + first + ' ' + last
  Maybe.returnM(wholeName)
}

const failedFullName = DO {
  person <= findWhere(list, moreProps)
  first <= dot('first')(person)
  last <= dot('last')(person)
  var wholeName = first + ' ' + last
  Maybe.returnM(wholeName)
}

log(prefixWithoutClosure)
log(withoutClosure)
log(withClosure)
log(prefixClosure)
log(withDoRaw)
log(withDo)
log(shouldBeNothing)
log(shouldBeNothingWithDo)
log(possibleFullName)
log(failedFullName)
