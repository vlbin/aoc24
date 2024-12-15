export interface Mappable<T> {
  map: <U>(fn: (x: T) => U) => Mappable<U>;
}

export type Tuple<A, B = A> = [A, B];

export type Grid<T> = ReadonlyArray<ReadonlyArray<T>>;

export type BinaryFunction<A, B, C> = (a: A, b: B) => C;

export type Coordinate<T> = [number, number, T];
