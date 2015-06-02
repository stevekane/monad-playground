const Task = require('./src/Task')
const Maybe = require('./src/Maybe')
const request = require('request')
const log = console.log.bind(console)
const pp = (v) => log(JSON.stringify(v, null, 2))


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

function getFullName (user) {
  return [user.name.title, user.name.first, user.name.last].join(' ')
}

const fetch = DO {
  person1 <- getRandomUser()
  person2 <- getRandomUser()
  let nameSummary = 'You fetched ' + getFullName(person1) + ' and ' + getFullName(person2)
  Task.returnM(nameSummary)
}

fetch.fmap(log)
