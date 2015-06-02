'use strict'

const Task = require('./src/Task')
const Maybe = require('./src/Maybe')
const request = require('request')
const log = console.log.bind(console)
const logStr = (v) => log(v.toString ? v.toString() : v)
const pp = (v) => log(JSON.stringify(v, null, 2))
const capitalize = (s) => s[0].toUpperCase() + s.slice(1)

//:: -> Task User
function getRandomUser () {
  return Task.Task(function (resolve) {
    request({
      method: 'get',
      json: true,
      uri: 'http://api.randomuser.me'
    }, function (error, response, body) {
      resolve(body.results[0].user) 
    })
  })
}

//:: User -> String
function getFullName (user) {
  return [
    capitalize(user.name.title), 
    capitalize(user.name.first), 
    capitalize(user.name.last)
  ].join(' ')
}

//:: Task String
const fetch = DO {
  person1 <- getRandomUser()
  person2 <- getRandomUser()
  const nameSummary = 'You fetched ' + getFullName(person1) + ' and ' + getFullName(person2)
  const punctuation = ' TADA!!!!!!!!!!'
  Task.returnM(nameSummary + punctuation)
}

const nestedObject = {
  info: {
    location: {
      latitude: 45,
      longitude: 66 
    }, 
    name: {
      first: 'Karl',
      last: 'Marx'      
    }
  }
}

function pluck (prop) {
  return function (obj) {
    return obj[prop] ? Maybe.Just(obj[prop]) : Maybe.Nothing()
  }
}

function pluckDeep (dotString) {
  return function (obj) {
    var chunks = dotString.split('.')
    var accum = pluck(chunks[0])(obj)

    for (var i = 1; i < chunks.length; i++) {
      accum = accum >>= pluck(chunks[i])
    }
    return accum
  }
}

const possibleName = DO {
  pluck('info')(nestedObject)
  pluck('name')
  pluck('first')
}

const possibleName2 = pluck('info')(nestedObject) >>= 
                      pluck('name') >>= 
                      pluck('first')

const possibleName3 = pluckDeep('info.name.first')(nestedObject)

const nameNotFound = DO {
  pluck('info')(nestedObject)
  pluck('personalInfo')
  pluck('first')
}

const nameNotFound2 = pluck('info')(nestedObject) >>=
                      pluck('personalInfo') >>=
                      pluck('first')

logStr(fetch)
fetch.fmap(log)
logStr(possibleName)
logStr(possibleName2)
logStr(possibleName3)
logStr(nameNotFound)
logStr(nameNotFound2)
