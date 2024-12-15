import type { Coordinate } from './types';

export const numbers = (line: string) => line.split('').map(Number);

export const spacedNumbers = (line: string) => line.split(' ').map(Number);

export const grid = (data: string) => data.split('\n').map((line) => line.split(''));

export const coords = (data: string): ReadonlyArray<Coordinate<string>> =>
  data.split('\n').flatMap((line, ri) => line.split('').map((el, ci) => [ri, ci, el] as Coordinate<string>));
