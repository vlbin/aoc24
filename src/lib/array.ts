export const map =
  <T, R>(fn: (item: T) => R) =>
  (items: ReadonlyArray<T>): ReadonlyArray<R> =>
    items.map(fn);

export const reduce =
  <T, R>(fn: (acc: R, curr: T) => R, initial: R) =>
  (items: ReadonlyArray<T>): R =>
    items.reduce(fn, initial);

export const filter =
  <T>(fn: (item: T) => boolean) =>
  (items: ReadonlyArray<T>): ReadonlyArray<T> =>
    items.filter(fn);

export const some =
  <T>(fn: (item: T) => boolean) =>
  (items: ReadonlyArray<T>): boolean =>
    items.some(fn);

export const every =
  <T>(fn: (item: T) => boolean) =>
  (items: ReadonlyArray<T>): boolean =>
    items.every(fn);

export const take =
  <T>(amount: number) =>
  (items: ReadonlyArray<T>) =>
    amount >= 0 ? items.slice(0, amount) : items.slice(amount);

export const sum = reduce<number, number>((acc, curr) => acc + curr, 0);

export const zip = <A, B>(as: Array<A>, bs: Array<B>) =>
  as.slice(0, Math.min(as.length, bs.length)).map((a, i) => [a, bs[i]]);

export const head = <T>(items: ReadonlyArray<T>) => items[0];
