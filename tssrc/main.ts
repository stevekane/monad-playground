import {Nothing, Just} from './Maybe'
import {log} from './show'

function addOne (x) { return x + 1 }
const n = new Nothing
const j = new Just(6)

const stillNothing = n.bind(n, addOne)
const incremented = j.bind(j, addOne)
const incrementedTwice = j.bind(j.bind(j, addOne), addOne)

log(n)
log(j)
log(stillNothing)
log(incremented)
log(incrementedTwice)
