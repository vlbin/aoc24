export interface Mappable<T> {
  map: <U>(fn: (x: T) => U) => Mappable<U>;
}

export type Tuple<A, B = A> = [A, B];

export type Grid<T> = ReadonlyArray<ReadonlyArray<T>>;
