import { pipe } from './pipe';

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

export const zip = <A, B>(as: ReadonlyArray<A>, bs: ReadonlyArray<B>) =>
  as.slice(0, Math.min(as.length, bs.length)).map((a, i) => [a, bs[i]]);

export const pairs = <A>(as: ReadonlyArray<A>) => as.slice(1).map((a, i) => [as[i], a]);

export const head = <T>(items: ReadonlyArray<T>) => items[0];

export const length = <T>(items: ReadonlyArray<T>) => items.length;

export const tail = <T>([_, ...rest]: ReadonlyArray<T>) => rest;

export const range = (start: number, end: number) => Array.from({ length: end - start }, (_, i) => start + i);

export const count = <T>(key: T) =>
  pipe(
    filter((el) => el === key),
    length,
  );

export const deleteAt =
  (index: number) =>
  <T>(items: ReadonlyArray<T>) => [...items.slice(0, index), ...items.slice(index + 1)];

export const updateAt =
  (index: number) =>
  <T>(fn: (el: T) => T) =>
  (items: ReadonlyArray<T>) =>
    index < 0 || index > items.length - 1
      ? items
      : [...items.slice(0, index), fn(items[index]), ...items.slice(index + 1)];
