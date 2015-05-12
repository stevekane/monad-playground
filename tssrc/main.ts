import {Nothing, Just} from './Maybe'
import {log} from './show'

const n = new Nothing
const j = new Just(6)

log(n)
log(j)
