import {Monad} from './Monad'

class Maybe implements Monad {
  constructor() {}
  unit(value: any) {
    return new Just(value);    
  }
  bind(ma: Just|Nothing, fn: Function) {
    return ma instanceof Just 
      ? new Just(fn(ma.value)) 
      : new Nothing
  }
}

export class Just extends Maybe {
  constructor(public value: any) {
    super()
  }
  toString(): string {
    return "Just " + this.value
  }
}

export class Nothing extends Maybe {
  constructor() {
    super()
  }
  toString(): string {
    return "Nothing"
  }
}
