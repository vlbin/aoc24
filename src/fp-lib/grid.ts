import type { Grid } from './types';
import { updateAt as updateArrayAt } from '@fp-lib/array';

export const at =
    <T>(row: number, col: number) =>
    (grid: Grid<T>) =>
        grid[row]?.[col];

export const updateAt =
    (row: number, col: number) =>
    <T>(fn: (el: T) => T) =>
    (grid: Grid<T>): Grid<T> =>
        row < 0 || col < 0 || row > grid.length || col > grid[0].length
            ? grid
            : [...grid.slice(0, row), updateArrayAt(col)(fn)(grid[row]), ...grid.slice(row + 1)];
