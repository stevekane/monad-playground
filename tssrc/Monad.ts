export interface Monad {
  unit: (value) => Monad;
  bind: (ma: Monad, fn: Function) => Monad;
}
