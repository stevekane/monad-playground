import {Monad} from './Monad'

class Maybe implements Monad {
  constructor(public value: any) {}
  unit(value: any) {
    return new Just(value);    
  }
  bind(ma: Just, fn: Function) {
    return ma instanceof Just 
      ? new Just(fn(ma.value)) 
      : new Nothing
  }
}

export class Just extends Maybe {
  constructor(value: any) {
    super(value)
  }
}

export class Nothing extends Maybe {
  constructor() {
    super(null)
  }
}
