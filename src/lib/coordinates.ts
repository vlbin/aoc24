import type { Coordinate } from './types';

export const size = <T>(coordinates: ReadonlyArray<Coordinate<T>>): [number, number] => [
  Math.max(...coordinates.map(([r]) => r)) + 1,
  Math.max(...coordinates.map(([_, c]) => c)) + 1,
];
