'use strict'

const test = require('tape')
const Task = require('../src/Task')

function getRemoteUser () {
  return Task.Task(function (resolve) {
    setTimeout(function () { 
      resolve({id: 1, name: 'Steve'}) 
    }, 30); 
  })
}

function updateRemoteUser (user) {
  return Task.Task(function (resolve) {
    setTimeout(function () { 
      user.name = 'Steve Kane'
      resolve(user)
    }, 30)
  })
}

test('Task is created as expected', function (t) {
  function fork (resolve) { return resolve(5) }
  const task = Task.Task(fork);

  t.true(task instanceof Task.Task)
  t.same(task.fork, fork)
  t.end()
})

test('Task is composable using bindM', function (t) {
  t.plan(1)
  getRemoteUser()
  .bindM(updateRemoteUser)
  .fmap(function (updatedUser) { t.same(updatedUser.name, 'Steve Kane') })
});

test('fmap will run when final value and return new Task', function (t) {
  t.plan(1)
  Task.returnM(1)
  .fmap(function (val) { t.same(val, 1) })
})
