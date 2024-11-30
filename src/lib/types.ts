export interface Mappable<T> {
  map<U>(fn: (x: T) => U): Mappable<U>;
}
